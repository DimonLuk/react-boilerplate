class ItemService {
  getItems() {
    return window.client.apis["app"]["app_item_search_items"]();
  }
  performTransition(userData) {
    return window.client.apis["app"]["app_item_perform_transition"]({
      data: userData,
    });
  }
}
export default new ItemService();
