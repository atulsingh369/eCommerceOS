import { CreateCategoryData, ListProductsByCategoryData, ListProductsByCategoryVariables, UpdateProductPriceData, UpdateProductPriceVariables, GetUserOrdersData, GetUserOrdersVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateCategory(options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateCategoryData, undefined>;
export function useCreateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateCategoryData, undefined>;

export function useListProductsByCategory(vars: ListProductsByCategoryVariables, options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, ListProductsByCategoryVariables>;
export function useListProductsByCategory(dc: DataConnect, vars: ListProductsByCategoryVariables, options?: useDataConnectQueryOptions<ListProductsByCategoryData>): UseDataConnectQueryResult<ListProductsByCategoryData, ListProductsByCategoryVariables>;

export function useUpdateProductPrice(options?: useDataConnectMutationOptions<UpdateProductPriceData, FirebaseError, UpdateProductPriceVariables>): UseDataConnectMutationResult<UpdateProductPriceData, UpdateProductPriceVariables>;
export function useUpdateProductPrice(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProductPriceData, FirebaseError, UpdateProductPriceVariables>): UseDataConnectMutationResult<UpdateProductPriceData, UpdateProductPriceVariables>;

export function useGetUserOrders(vars: GetUserOrdersVariables, options?: useDataConnectQueryOptions<GetUserOrdersData>): UseDataConnectQueryResult<GetUserOrdersData, GetUserOrdersVariables>;
export function useGetUserOrders(dc: DataConnect, vars: GetUserOrdersVariables, options?: useDataConnectQueryOptions<GetUserOrdersData>): UseDataConnectQueryResult<GetUserOrdersData, GetUserOrdersVariables>;
