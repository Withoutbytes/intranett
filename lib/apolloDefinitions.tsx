import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
};

export type Query = {
    __typename?: "Query";
    getUser: User;
    getUsers: Array<User>;
    getMe: User;
    getTasksAll: Array<Task>;
    getTasks: Array<Task>;
};

export type QueryGetUserArgs = {
    email: Scalars["String"];
};

export type QueryGetTasksAllArgs = {
    limit?: Maybe<Scalars["Int"]>;
    skip?: Maybe<Scalars["Int"]>;
};

export type QueryGetTasksArgs = {
    limit?: Maybe<Scalars["Int"]>;
    skip?: Maybe<Scalars["Int"]>;
};

export type User = {
    __typename?: "User";
    _id: Scalars["ID"];
    role: Role;
    image?: Maybe<Scalars["String"]>;
    email: Scalars["String"];
};

export enum Role {
    Admin = "ADMIN",
    Member = "MEMBER",
}

export type Task = {
    __typename?: "Task";
    _id: Scalars["ID"];
    name: Scalars["String"];
    completed: Scalars["Boolean"];
    createdAt: Scalars["DateTime"];
    endAt: Scalars["DateTime"];
    createdById: Scalars["ID"];
    responsiblesIds: Array<Scalars["ID"]>;
    createdBy: User;
    responsibles: Array<User>;
};

export type Mutation = {
    __typename?: "Mutation";
    login: LoginResponse;
    register: Scalars["Boolean"];
    deleteUser: Scalars["Boolean"];
    createTask: Task;
    updateTask: Scalars["Boolean"];
    deleteTask: Scalars["Boolean"];
};

export type MutationLoginArgs = {
    role: Role;
    password: Scalars["String"];
    email: Scalars["String"];
};

export type MutationRegisterArgs = {
    role: Role;
    password: Scalars["String"];
    email: Scalars["String"];
    name: Scalars["String"];
};

export type MutationDeleteUserArgs = {
    email: Scalars["String"];
};

export type MutationCreateTaskArgs = {
    data: TaskCreateInput;
};

export type MutationUpdateTaskArgs = {
    data: TaskUpdateInput;
    id: Scalars["ID"];
};

export type MutationDeleteTaskArgs = {
    id: Scalars["ID"];
};

export type LoginResponse = {
    __typename?: "LoginResponse";
    token: Scalars["String"];
};

export type TaskCreateInput = {
    name: Scalars["String"];
    responsiblesIds: Array<Scalars["String"]>;
    endAt: Scalars["DateTime"];
};

export type TaskUpdateInput = {
    completed?: Maybe<Scalars["Boolean"]>;
    finishAt?: Maybe<Scalars["DateTime"]>;
    responsiblesIds?: Maybe<Scalars["ID"]>;
};

export type RegisterMutationVariables = Exact<{
    role: Role;
    password: Scalars["String"];
    email: Scalars["String"];
    name: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation"; register: boolean };

export type LoginMutationVariables = Exact<{
    password: Scalars["String"];
    email: Scalars["String"];
    role: Role;
}>;

export type LoginMutation = {
    __typename?: "Mutation";
    login: { __typename?: "LoginResponse"; token: string };
};

export type CreateTaskMutationVariables = Exact<{
    data: TaskCreateInput;
}>;

export type CreateTaskMutation = {
    __typename?: "Mutation";
    createTask: {
        __typename?: "Task";
        name: string;
        completed: boolean;
        createdAt: any;
        endAt: any;
        createdById: string;
        createdBy: {
            __typename?: "User";
            _id: string;
            role: Role;
            email: string;
        };
    };
};

export type TasksQueryVariables = Exact<{ [key: string]: never }>;

export type TasksQuery = {
    __typename?: "Query";
    getTasks: Array<{
        __typename?: "Task";
        name: string;
        completed: boolean;
        createdAt: any;
        _id: string;
        endAt: any;
        responsibles: Array<{
            __typename?: "User";
            role: Role;
            email: string;
            image?: string | null | undefined;
        }>;
        createdBy: {
            __typename?: "User";
            email: string;
            image?: string | null | undefined;
            role: Role;
        };
    }>;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
    __typename?: "Query";
    getUsers: Array<{
        __typename?: "User";
        _id: string;
        role: Role;
        email: string;
    }>;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
    __typename?: "Query";
    getMe: {
        __typename?: "User";
        image?: string | null | undefined;
        email: string;
        role: Role;
    };
};

export type UpdateTaskMutationVariables = Exact<{
    updateTaskData: TaskUpdateInput;
    updateTaskId: Scalars["ID"];
}>;

export type UpdateTaskMutation = {
    __typename?: "Mutation";
    updateTask: boolean;
};

export const RegisterDocument = gql`
    mutation Register(
        $role: Role!
        $password: String!
        $email: String!
        $name: String!
    ) {
        register(role: $role, password: $password, email: $email, name: $name)
    }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
    RegisterMutation,
    RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      role: // value for 'role'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RegisterMutation,
        RegisterMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        options
    );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!, $role: Role!) {
        login(password: $password, email: $email, role: $role) {
            token
        }
    }
`;
export type LoginMutationFn = Apollo.MutationFunction<
    LoginMutation,
    LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useLoginMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        options
    );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
export const CreateTaskDocument = gql`
    mutation CreateTask($data: TaskCreateInput!) {
        createTask(data: $data) {
            name
            completed
            createdAt
            endAt
            createdById
            createdBy {
                _id
                role
                email
            }
        }
    }
`;
export type CreateTaskMutationFn = Apollo.MutationFunction<
    CreateTaskMutation,
    CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateTaskMutation,
        CreateTaskMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
        CreateTaskDocument,
        options
    );
}
export type CreateTaskMutationHookResult = ReturnType<
    typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult =
    Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
>;
export const TasksDocument = gql`
    query Tasks {
        getTasks {
            name
            completed
            responsibles {
                role
                email
                image
            }
            createdAt
            _id
            endAt
            createdBy {
                email
                image
                role
            }
        }
    }
`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useTasksQuery(
    baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<TasksQuery, TasksQueryVariables>(
        TasksDocument,
        options
    );
}
export function useTasksLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(
        TasksDocument,
        options
    );
}
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksQueryResult = Apollo.QueryResult<
    TasksQuery,
    TasksQueryVariables
>;
export const GetUsersDocument = gql`
    query GetUsers {
        getUsers {
            _id
            role
            email
        }
    }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
    baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
        GetUsersDocument,
        options
    );
}
export function useGetUsersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetUsersQuery,
        GetUsersQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
        GetUsersDocument,
        options
    );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
    typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
    GetUsersQuery,
    GetUsersQueryVariables
>;
export const GetMeDocument = gql`
    query GetMe {
        getMe {
            image
            email
            role
        }
    }
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
    baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
        GetMeDocument,
        options
    );
}
export function useGetMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
        GetMeDocument,
        options
    );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<
    GetMeQuery,
    GetMeQueryVariables
>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($updateTaskData: TaskUpdateInput!, $updateTaskId: ID!) {
        updateTask(data: $updateTaskData, id: $updateTaskId)
    }
`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      updateTaskData: // value for 'updateTaskData'
 *      updateTaskId: // value for 'updateTaskId'
 *   },
 * });
 */
export function useUpdateTaskMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UpdateTaskMutation,
        UpdateTaskMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(
        UpdateTaskDocument,
        options
    );
}
export type UpdateTaskMutationHookResult = ReturnType<
    typeof useUpdateTaskMutation
>;
export type UpdateTaskMutationResult =
    Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
>;
