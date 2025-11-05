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

### Properties
#### plugin <Badge type="tip" text="Plugin" />
The `Plugin` global to use

### Raw Interface
::: details Raw Interface
<<< @/../src/components/plugin/PluginProvider.tsx#component-interface {1}
:::
