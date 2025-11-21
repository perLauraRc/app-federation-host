import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Post } from './post'

// Query response type
export type GetPostsQueryResponse = {
  posts: {
    data: Post[]
    meta: {
      totalCount: number
    }
  }
}

// Query variables type - More permissive version
// Type with string keys and string values
// export type GetPostsQueryVariables = Record<string, string>

// Query variables type - Specific version
export type GetPostsQueryVariables = {
  options?: {
    paginate?: {
      page: number
      limit: number
    }
  }
}

// GraphQL document type with Apollo's generic type TypedDocumentNode
// It takes two parameters: the response type and the variables type (what you get back and what you send in)
export type GetPostsDocumentQuery = TypedDocumentNode<
  GetPostsQueryResponse,
  GetPostsQueryVariables
>

export const GET_POSTS: GetPostsDocumentQuery = gql`
  query GetPosts {
    posts {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`

export const GET_POSTS_TABLE: GetPostsDocumentQuery = gql`
  query GetPostsTable($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`
