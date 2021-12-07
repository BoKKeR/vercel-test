function withDefaultProps<P>(Component: React.ComponentType<P>, defaultProps: Partial<P>) {
  return (props: P) => <Component {...defaultProps} {...props} />
}

export default withDefaultProps
