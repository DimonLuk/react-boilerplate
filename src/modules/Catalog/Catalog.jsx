import {
  Box,
  Chip,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";
import { useEffect } from "react";
import { useState } from "react";
import ItemService from "../../services/Item.service";
import { ApplicationContext } from "../../App";
import { useContext } from "react";

const Catalog = (props) => {
  const [items, setItems] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filtration, setFiltration] = useState();
  const [searchedText, setSearchedText] = useState("");
  const { userState, loadingState, errorState } = useContext(
    ApplicationContext
  );
  const { setLoading, loading } = loadingState;
  const { setError } = errorState;

  const { user } = userState;

  const [itemChanged, setItemChanged] = useState(false);

  const showFiltered = filtration || searchedText ? filteredItems : items;

  const renderItems = (items) => {
    if (!items.length) {
      return "No items found.";
    }
    return items.map((item) => {
      return (
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          key={Math.random() * 100000}
        >
          {!item.name ? (
            <Skeleton variant="rect" width={"100%"} height={600} />
          ) : (
            <ProductItem
              onChange={() => {
                setItemChanged((prevstate) => !prevstate);
              }}
              key={item.description + item.name}
              item={item}
              {...item}
            />
          )}
        </Grid>
      );
    });
  };
  useEffect(() => {
    var a = async () => {
      try {
        if (user) {
          setLoading(true);
          const response = await ItemService.getItems({});
          setItems(response.body.list || []);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    a();
  }, [itemChanged, setError, setLoading]);

  useEffect(() => {
    let filtered;
    switch (filtration) {
      case "H":
      case "W":
      case "M":
        filtered = items.filter((item) => item.rate === filtration);
        break;
      case "Free items":
        filtered = items.filter((item) => item.state === filtration);
        break;
      case "My items":
        filtered = items.filter((item) => item.owner_email === user.email);
        break;

      default:
        filtered = items;
    }

    filtered = filtered.filter((item) => {
      var itemValues = Object.values(item);
      let isIncluded = false;
      itemValues.forEach((itemValue) => {
        if (
          itemValue &&
          itemValue.toString().includes(searchedText.toLowerCase())
        ) {
          isIncluded = true;
        }
      });
      return isIncluded;
    });

    setFilteredItems(filtered);
  }, [filtration, searchedText, items]);
  const history = useHistory();

  if (!user) {
    history.push("/registration");
    return null;
  }
  return (
    <>
      <Grid container>
        <Box display="flex" style={{ margin: "60px" }} width="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            width="90%"
            margin="auto"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography variant="h3">Catalog</Typography>

              <TextField
                variant="filled"
                placeholder="Search"
                style={{ marginTop: "40px" }}
                onChange={(e) => setSearchedText(e.target.value)}
                disabled={loading}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" width="50%">
              <Box>
                <Button
                  style={{
                    background: "black",
                    color: "white",
                    marginTop: "100px",
                  }}
                  size="large"
                  onClick={() => setFiltration()}
                  disabled={loading}
                  color="primary"
                  variant="contained"
                >
                  Reset filters
                </Button>
              </Box>

              <Box>
                <Typography variant="h5" style={{ marginTop: "60px" }}>
                  Item type
                </Typography>
                <Box marginTop="20px">
                  <Chip
                    label="Free items"
                    color={filtration === "free" ? "secondary" : "default"}
                    onClick={() => {
                      setFiltration("free");
                    }}
                    disabled={loading}
                  />
                  <Chip
                    label="My items"
                    color={filtration === "My items" ? "secondary" : "default"}
                    onClick={() => {
                      setFiltration("My items");
                    }}
                    disabled={loading}
                  />
                </Box>
              </Box>

              <Box>
                <Typography variant="h5" style={{ marginTop: "60px" }}>
                  Rate type
                </Typography>
                <Box marginTop="20px">
                  <Chip
                    label="Hourly"
                    color={filtration === "H" ? "secondary" : "default"}
                    onClick={() => {
                      setFiltration("H");
                    }}
                    disabled={loading}
                  />
                  <Chip
                    label="Weekly"
                    color={filtration === "W" ? "secondary" : "default"}
                    onClick={() => {
                      setFiltration("W");
                    }}
                    disabled={loading}
                  />
                  <Chip
                    label="Monthly"
                    color={filtration === "M" ? "secondary" : "default"}
                    onClick={() => {
                      setFiltration("M");
                    }}
                    disabled={loading}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Grid
          style={{ width: "calc(100vw - 100px)", margin: "auto" }}
          container
          spacing={10}
        >
          {renderItems(showFiltered)}
        </Grid>
      </Grid>
    </>
  );
};
export default withRouter(Catalog);
