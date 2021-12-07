[Keyb.io](Keyb.io)

# Auth

We use [NextAuth](!https://next-auth.js.org/).

Main files:

- `/pages/api/auth/[...nextauth].ts`: NextAuth configuration (Providers, Callbacks, etc)
- `/src/auth/providers/keycloak.ts`: Custom Keycloak provider for NextAuth

## Sign In and Sign Out

```tsx
import { signIn, signOut } from 'next-auth/client'

//...

const onSignIn = () => {
  signIn('keycloak')
}

const onSignOut = () => {
  signOut()
}
```

## Session

### Data

```tsx
type Session = {
  accessToken: string // Keycloak AcessToken
  expires: string // Accesstoken expiration time
  user: KeycloakUser // User returned by Keycloak
  tokenUser: TokenUser // Decoded AccessToken
  dbUser: PrivateUser // User returned by the backend
}
```

### Usage (Hook)

```tsx
import useSession from '@/hooks/useSession'

const Component = () => {
  const [session, loading] = useSession()
}
```

### Usage (Server Side)

```tsx
import { getSession } from 'next-auth/client'

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const session = getSession(context)

  return { props: {} }
})
```

### Notes

- The getServerSideProp `context` is needed to get the correct session in the server side. Because of this, if you need to fetch data from the backend that depends on the session, then you need to pass the context as an axios request opion.

# Redux

## Adding a new action

Add action object in `src/redux/actions/types.ts`

```ts
const NAME_ACTION: ReduxAction = {
  REQUESTED: 'NAME_REQUESTED',
  SUCCEEDED: 'NAME_SUCCEEDED',
  FAILED: 'NAME_FAILED',
}
```

Create reducer or modify an existing one (`src/redux/reducers`) to use these actions

```ts
case ReduxActionTypes.NAME.REQUESTED:
  return { ...state, loading: true }

case ReduxActionTypes.NAME.FAILED:
  return { ...state, loading: false, error: action.payload }

case ReduxActionTypes.NAME.SUCCEEDED:
  return { ...state, loading: false, posts: action.payload.data }
```

Add it to rootSaga in `src/redux/saga.ts`

```ts
function* rootSaga() {
  //...

  yield takeLatest(ReduxActionTypes.NAME.REQUESTED, fetchDataSaga.bind(null, functionToCall, ReduxActionTypes.NAME))
}
```

Add selector in `src/redux/selectors`

```ts
import { useTypedSelector } from '.'
import { RootState } from '../reducers'

export const useName = (): RootState['stateItBelongsto'] => {
  const nameState = useTypedSelector((state) => state.stateItBelongsTo)

  return nameState
}
```

Done! Now it can be used inside components and/or components data fetching methods (getServerSideProps, getStaticProps, ...)

## Awaiting for Saga to resolve in NextJS Data Fetching Functions

```tsx
import { dispatchInSSR } from '@/utils/redux'

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const action = getReduxAction('action', 'actionType')({ ...options })

  await dispatchInSSR(context.store, action)

  return {
    props: {},
  }
})
```

or, if you need to dispatch multiple actions

```tsx
import { dispatchInSSR } from '@/utils/redux'

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const action1 = getReduxAction('action1', 'actionType')({ ...options })
  const action2 = getReduxAction('action2', 'actionType')({ ...options })

  await dispatchInSSR(context.store, [action1, action2])

  return {
    props: {},
  }
})
```

# Adding a new component

Run

```bash
npx hygen component new --name ComponentName --type [atoms | molecules | organisms | templates | pages]
```

Types:

- atoms - Independent and simple components (e.g. Button)
- molecules - Combination of atoms that can be reused in different components (e.g. Field (Label + Input) )
- organisms - Combination of atoms and molecules that are usually used once (e.g. Navbar)
- templates - Layouts
- pages - Pages

This will generate 4 files in `/src/components/[type]/ComponentName`:

- index.ts - Exports ComponentName by default
- styled.ts - Exports ComponentNameStyles by default
- ComponentName.tsx - Exports ComponentName and ComponentNameProps
- ComponentName.stories.tsx - Story for Storybook

This template can be edited in `_templates/component/new`

# Styling

## Variables

The variables are set in TS and then converted into CSS Variables. They can be modified in `src/theme`

### getCSSVar(variableName)

Helper that returns `var(--variableName)`, it's used to typescript autocompletion and validation. If the variable doesn't exist it will just return `variableName`, this is useful in cases we want to use either a css variable or a css rule value, i.e. `getCSSVar("purple")` will return `purple`.

### getSpacing(multiplier)

Helper that returns `var(calc(--spacing * {multiplier}))`.

## Block Component

The Block component is the base for almost every other component. It's used as helper to easily style a component

### Props

```js
direction?: 'column' | 'row' //Used to know what margin to apply (bottom or right)
margin?: boolean //Apply bottom/right margin unless its the last children
marginSize?: number
padding?: boolean
paddingSize?: number
background?: CSSColor
textColor?: CSSColor
border?: boolean
borderWidth?: string
borderRadius?: string
borderColor?: CSSColor
flex?: boolean
flexDirection?: 'column' | 'row'
justifyContent?: 'center' | 'flex-end' | 'flex-start'
alignItems?: 'center' | 'flex-end' | 'flex-start'
textAlign?: 'center' | 'left' | 'right'
sxPseudo?: [string, CSSProperties][] // i.e. [['focus', {background: 'blue'}]] will apply a blue background when the element is focused
sxHover?: CSSProperties
sxFocus?: CSSProperties
sx?: CSSProperties // See https://emotion.sh/docs/css-prop
as?: React.ElementType // Used to change the tag name
```

### Usage

```tsx
const Anchor = ({ children, ...props }) => {
  return (
    <Block as="a" textColor="color_text" sxHover={{ color: getCSSVar('color_primary') }} {...props}>
      {children}
    </Block>
  )
}
```

## Storybook

To start the server run: `npm run storybook`.
