const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'ecom-web',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createCategoryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCategory');
}
createCategoryRef.operationName = 'CreateCategory';
exports.createCategoryRef = createCategoryRef;

exports.createCategory = function createCategory(dc) {
  return executeMutation(createCategoryRef(dc));
};

const listProductsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductsByCategory', inputVars);
}
listProductsByCategoryRef.operationName = 'ListProductsByCategory';
exports.listProductsByCategoryRef = listProductsByCategoryRef;

exports.listProductsByCategory = function listProductsByCategory(dcOrVars, vars) {
  return executeQuery(listProductsByCategoryRef(dcOrVars, vars));
};

const updateProductPriceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProductPrice', inputVars);
}
updateProductPriceRef.operationName = 'UpdateProductPrice';
exports.updateProductPriceRef = updateProductPriceRef;

exports.updateProductPrice = function updateProductPrice(dcOrVars, vars) {
  return executeMutation(updateProductPriceRef(dcOrVars, vars));
};

const getUserOrdersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserOrders', inputVars);
}
getUserOrdersRef.operationName = 'GetUserOrders';
exports.getUserOrdersRef = getUserOrdersRef;

exports.getUserOrders = function getUserOrders(dcOrVars, vars) {
  return executeQuery(getUserOrdersRef(dcOrVars, vars));
};
