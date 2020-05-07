import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Dialog,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import moment from "moment";
import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { ApplicationContext } from "../../App";
import ItemService from "../../services/Item.service";
import Feedback from "../FeedbackSection/Feedback";
import { getRateString } from "../ItemDetails/ItemDetails.jsx";

const WAITING_FOR_OWNER_APPROVAL = "pending_owner_approval";

const calculateMaxDate = ({ wallet, startDate, rateType, price }) => {
  let hourlyCost;
  switch (rateType) {
    case "H":
      hourlyCost = price;
      break;
    case "M":
      hourlyCost = price / (24 * 10 * 3);
      break;
    case "D":
      hourlyCost = price / 24;
      break;
    default:
      break;
  }

  const momentEndDate = moment(startDate);
  momentEndDate.add((parseFloat(wallet) + 10000) / hourlyCost, "hours");
  return momentEndDate.toDate();
};

const ProductItem = (props) => {
  const {
    pictures,
    name,
    description,
    id,
    price,
    state,
    rate,
    owner_email,
    lender_email,
    onChange,
  } = props;

  const { userState, loadingState, errorState } = useContext(
    ApplicationContext
  );
  const { user } = userState;
  const { setLoading } = loadingState;
  const { setError } = errorState;
  const [leaseDialogOpen, setLeaseDialogOpen] = useState();
  const [confirmLeaseDialogOpen, setConfirmLeaseDialogOpen] = useState();
  const [stopLeaseDialogOpen, setStopLeaseDialogOpen] = useState();
  const [lenderScore, setLenderScore] = useState();
  const [leaserScore, setLeaserScore] = useState();

  const [freeItemDialogOpen, setFreeItemDialogOpen] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.up("xs")) && "100px";
  const sm = useMediaQuery(theme.breakpoints.up("sm")) && "200px";

  const lg = useMediaQuery(theme.breakpoints.up("lg")) && "300px";
  const xl = useMediaQuery(theme.breakpoints.up("xl")) && "400px";

  const renderButton = () => {
    if (owner_email === user.email && state === WAITING_FOR_OWNER_APPROVAL) {
      return (
        <Button
          onClick={() => {
            setConfirmLeaseDialogOpen(true);
          }}
          variant="contained"
          style={{ background: "#fdee00", color: "black" }}
        >
          Confirm Lease
        </Button>
      );
    }
    if (
      lender_email &&
      lender_email === user.email &&
      state === "usage_started"
    ) {
      return (
        <Button
          onClick={() => {
            setStopLeaseDialogOpen(true);
          }}
          variant="contained"
          style={{ background: "#fdee00", color: "black" }}
        >
          Stop Lease
        </Button>
      );
    }
    if (owner_email === user.email && state === "usage_ended") {
      return (
        <Button
          onClick={() => {
            setFreeItemDialogOpen(true);
          }}
          variant="contained"
          style={{ background: "#fdee00", color: "black" }}
        >
          Make Free
        </Button>
      );
    }
    if (owner_email !== user.email && state === "free") {
      return (
        <Button
          onClick={() => {
            setLeaseDialogOpen(true);
          }}
          variant="contained"
          style={{ background: "#fdee00", color: "black" }}
        >
          Lease
        </Button>
      );
    }
    return null;
  };

  return (
    <>
      <Paper
        elevation={4}
        style={{ minWidth: "300px", minHeight: "750px", padding: "50px" }}
      >
        <Box minWidth="300px" minHeight="300px">
          <img
            src={
              pictures && pictures[0].file.replace(["b'"], "").replace("'", "")
            }
            alt="pic"
            className="noselect"
            width={xl || lg || sm || xs || undefined}
          />
        </Box>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="body2" style={{ marginTop: "30px" }}>
          {description}
        </Typography>
        <Typography variant="body2" style={{ marginTop: "30px" }}>
          Price: {"$" + price}
        </Typography>
        <Typography variant="body2" style={{ marginTop: "30px" }}>
          Rate type: {getRateString(rate)}
        </Typography>
        <Typography
          variant="body2"
          style={{ marginTop: "30px", textTransform: "capitalize" }}
        >
          {state.split("_").join(" ")}
        </Typography>
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          marginTop="20px"
        >
          {/* <Button
            onClick={() => {
              id && history.push(`/catalog/${id}`);
              setCurrentItem(item);
              localStorage.currentItem = JSON.stringify(item);
            }}
            variant="contained"
            style={{ background: "#fdde00" }}
          >
            Details
          </Button> */}

          {renderButton()}
        </Box>
      </Paper>
      {leaseDialogOpen && (
        <Dialog
          open={leaseDialogOpen}
          onClose={() => setLeaseDialogOpen(false)}
        >
          <Paper>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Box
                display="flex"
                flexDirection="column"
                padding="50px 50px 50px 50px"
              >
                <Typography variant="h5">Enter leasing dates</Typography>
                <DateTimePicker
                  value={startDate}
                  views={["date", "year", "month", "hours"]}
                  onChange={(value) => {
                    setStartDate(value);
                    if (!endDate || value > endDate) {
                      setEndDate(value);
                    }
                  }}
                  label="Start Date"
                  style={{ marginTop: "30px" }}
                  disablePast
                  maxDate={endDate || new Date("2100-01-01")}
                />
                <DateTimePicker
                  value={endDate}
                  onChange={setEndDate}
                  style={{ marginTop: "30px" }}
                  label="End Date"
                  minDate={startDate || new Date("1900-01-01")}
                  maxDate={calculateMaxDate({
                    wallet: user.wallet,
                    startDate,
                    rateType: rate,
                    price,
                  })}
                />
                <Button
                  style={{ marginTop: "30px", background: "#fdde00" }}
                  onClick={() => {
                    const userData = {
                      id,
                      transition: "ask_owner_approval",
                      data: {
                        start_date: moment(startDate).format(
                          "YYYY-MM-DD[T]HH:mm:ss"
                        ),
                        end_date: moment(endDate).format(
                          "YYYY-MM-DD[T]HH:mm:ss"
                        ),
                      },
                    };
                    ItemService.performTransition(userData)
                      .then(() => {
                        if (onChange) {
                          onChange();
                        }
                      })
                      .catch((value) => {
                        setError(value);
                      })
                      .finally(() => {
                        setLeaseDialogOpen(false);
                        setLoading(false);
                      });
                    setLoading(true);
                  }}
                  disabled={!startDate || !endDate}
                >
                  Confirm
                </Button>
              </Box>
            </MuiPickersUtilsProvider>
          </Paper>
        </Dialog>
      )}
      {confirmLeaseDialogOpen && (
        <Dialog
          open={confirmLeaseDialogOpen}
          onClose={() => confirmLeaseDialogOpen(false)}
        >
          <Paper>
            <Box
              display="flex"
              flexDirection="column"
              padding="50px 50px 50px 50px"
            >
              <Typography variant="h5">Enter leasing dates</Typography>

              <Button
                style={{ marginTop: "30px", background: "#fdde00" }}
                onClick={() => {
                  const userData = {
                    id,
                    transition: "owner_approves",
                  };
                  ItemService.performTransition(userData)
                    .then(() => {
                      if (onChange) {
                        onChange();
                      }
                    })
                    .catch((value) => {
                      setError(value);
                    })
                    .finally(() => {
                      setConfirmLeaseDialogOpen(false);
                      setLoading(false);
                    });
                  setLoading(true);
                }}
              >
                Confirm
              </Button>
            </Box>
          </Paper>
        </Dialog>
      )}
      {stopLeaseDialogOpen && (
        <Dialog
          open={stopLeaseDialogOpen}
          onClose={() => setStopLeaseDialogOpen(false)}
        >
          <Paper>
            <Box
              display="flex"
              flexDirection="column"
              padding="50px 50px 50px 50px"
            >
              <Typography variant="h5">Leave your feedback</Typography>
              <Feedback
                style={{ marginTop: "30px" }}
                onChange={(value) => setLenderScore(value)}
              />
              <Button
                style={{ marginTop: "30px", background: "#fdde00" }}
                onClick={() => {
                  const userData = {
                    id,
                    transition: "end_usage",
                    data: {
                      lender_score: lenderScore,
                    },
                  };
                  ItemService.performTransition(userData)
                    .then(() => {
                      if (onChange) {
                        onChange();
                      }
                    })
                    .catch((value) => {
                      setError(value);
                    })
                    .finally(() => {
                      setStopLeaseDialogOpen(false);
                      setLoading(false);
                    });
                  setLoading(true);
                }}
              >
                Stop Lease
              </Button>
            </Box>
          </Paper>
        </Dialog>
      )}
      {freeItemDialogOpen && (
        <Dialog
          open={freeItemDialogOpen}
          onClose={() => setFreeItemDialogOpen(false)}
        >
          <Paper>
            <Box
              display="flex"
              flexDirection="column"
              padding="50px 50px 50px 50px"
            >
              <Typography variant="h5">Leave your feedback</Typography>
              <Feedback
                style={{ marginTop: "30px" }}
                onChange={(value) => setLeaserScore(value)}
              />
              <Button
                style={{ marginTop: "30px", background: "#fdde00" }}
                onClick={() => {
                  const userData = {
                    id,
                    transition: "make_free",
                    data: {
                      leaser_score: leaserScore,
                    },
                  };
                  ItemService.performTransition(userData)
                    .then(() => {
                      if (onChange) {
                        onChange();
                      }
                    })
                    .catch((value) => {
                      setError(value);
                    })
                    .finally(() => {
                      setFreeItemDialogOpen(false);
                      setLoading(false);
                    });
                  setLoading(true);
                }}
              >
                Make Free
              </Button>
            </Box>
          </Paper>
        </Dialog>
      )}
    </>
  );
};

export default withRouter(ProductItem);
