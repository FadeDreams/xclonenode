/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  Tweet: { // root type
    content?: string | null; // String
    createdAt?: string | null; // String
    id?: string | null; // String
  }
  User: { // root type
    email?: string | null; // String
    id?: string | null; // String
    name?: string | null; // String
    password?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createTweet: NexusGenRootTypes['Tweet'] | null; // Tweet
    getAllUsers: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    getTweets: Array<NexusGenRootTypes['Tweet'] | null> | null; // [Tweet]
    isAuth: NexusGenRootTypes['User'] | null; // User
    login: boolean | null; // Boolean
    logout: boolean | null; // Boolean
    register: boolean | null; // Boolean
  }
  Query: { // field return type
    hello: string | null; // String
  }
  Tweet: { // field return type
    content: string | null; // String
    createdAt: string | null; // String
    id: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    email: string | null; // String
    id: string | null; // String
    name: string | null; // String
    password: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createTweet: 'Tweet'
    getAllUsers: 'User'
    getTweets: 'Tweet'
    isAuth: 'User'
    login: 'Boolean'
    logout: 'Boolean'
    register: 'Boolean'
  }
  Query: { // field return type name
    hello: 'String'
  }
  Tweet: { // field return type name
    content: 'String'
    createdAt: 'String'
    id: 'String'
    user: 'User'
  }
  User: { // field return type name
    email: 'String'
    id: 'String'
    name: 'String'
    password: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createTweet: { // args
      content: string; // String!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    register: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}