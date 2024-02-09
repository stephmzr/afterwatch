import { ModelDefinitionType, useGraphqlModel } from '@9troisquarts/wand';
import { gql, useQuery } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments'
import { UserType } from '../../react/types';

export const SEARCH_USERS_DEFINITION: ModelDefinitionType = {
  indexedFullNameICont: 'String',
}

export const USER_DEFINITION: ModelDefinitionType = {
  firstName: 'String',
  lastName: 'String',
  email: 'String',
  active: 'Boolean'
};

export const USERS_QUERY = gql`
  query users($search: SearchUsersAttributes, $perPage: Int, $page: Int) {
    users(search: $search, perPage: $perPage, page: $page) {
      users {
        ...UserInfo
      }
      pagination {
        total
        perPage
        page
        totalPage
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const USER_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      ...UserInfo
    }
  }
  ${USER_FRAGMENT}
`

const useUser = useGraphqlModel<UserType>('user', {
  flashMessages: true,
  definition: USER_DEFINITION,
  fragment: USER_FRAGMENT
})


export default useUser;