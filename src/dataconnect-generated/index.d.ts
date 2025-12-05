import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CartItem_Key {
  cartId: UUIDString;
  productId: UUIDString;
  __typename?: 'CartItem_Key';
}

export interface Cart_Key {
  id: UUIDString;
  __typename?: 'Cart_Key';
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateCategoryData {
  category_insert: Category_Key;
}

export interface GetUserOrdersData {
  orders: ({
    id: UUIDString;
    orderDate: TimestampString;
    totalAmount: number;
  } & Order_Key)[];
}

export interface GetUserOrdersVariables {
  userId: UUIDString;
}

export interface ListProductsByCategoryData {
  products: ({
    id: UUIDString;
    name: string;
    price: number;
  } & Product_Key)[];
}

export interface ListProductsByCategoryVariables {
  categoryId: UUIDString;
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface UpdateProductPriceData {
  product_update?: Product_Key | null;
}

export interface UpdateProductPriceVariables {
  id: UUIDString;
  price: number;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateCategoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateCategoryData, undefined>;
  operationName: string;
}
export const createCategoryRef: CreateCategoryRef;

export function createCategory(): MutationPromise<CreateCategoryData, undefined>;
export function createCategory(dc: DataConnect): MutationPromise<CreateCategoryData, undefined>;

interface ListProductsByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
  operationName: string;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;

export function listProductsByCategory(vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;
export function listProductsByCategory(dc: DataConnect, vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;

interface UpdateProductPriceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
  operationName: string;
}
export const updateProductPriceRef: UpdateProductPriceRef;

export function updateProductPrice(vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;
export function updateProductPrice(dc: DataConnect, vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;

interface GetUserOrdersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserOrdersVariables): QueryRef<GetUserOrdersData, GetUserOrdersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserOrdersVariables): QueryRef<GetUserOrdersData, GetUserOrdersVariables>;
  operationName: string;
}
export const getUserOrdersRef: GetUserOrdersRef;

export function getUserOrders(vars: GetUserOrdersVariables): QueryPromise<GetUserOrdersData, GetUserOrdersVariables>;
export function getUserOrders(dc: DataConnect, vars: GetUserOrdersVariables): QueryPromise<GetUserOrdersData, GetUserOrdersVariables>;

