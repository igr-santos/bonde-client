# Widgets

Documentation to make widget components.

**props**: all the components children of Widget received a widget object and an update action.

```
props = {
  widget: PropTypes.shape({
    id: PropTypes.number,
    kind: PropTypes.string,
    settings: PropTypes.object
  }),
  update: PropTypes.func
}
```
