# PluginProvider
`PluginProvider` is a **required** wrapper for component that provides the internal `PluginContext` React Context to its children. It should be used near the root of your plugin's React tree.

::: tip IMPORTANT
`PluginProvier` should always be at the top of your tree, or else other PluginComponents (and some UIComponents) will not function.

```tsx {}
<StrictMode>
{/* [!code focus:3] */}
    <PluginProvider>
        ...
    </PluginProvider>
</StrictMode>
```
:::

## `<PluginProvider>`
`<PluginProvider>` accepts the following props:
```ts
interface PluginProviderProps {
    // children is automatically handled by React JSX, do not use
    children?: ReactNode;

    // You must pass in the `plugin` global here
	plugin: Plugin;
}
```