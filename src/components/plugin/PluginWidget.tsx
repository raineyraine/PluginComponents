import React, { ReactNode, useContext, useEffect, useMemo, useState } from "@rbxts/react";
import PluginContext from "../../contexts/plugin/PluginContext";
import { createPortal } from "@rbxts/react-roblox";
import WidgetContext from "../../contexts/plugin/WidgetContext";

interface CustomDockWidgetPluginGui extends DockWidgetPluginGui {
	/**
	 * This function binds a function to the PluginGui close button, overriding the default behavior.
	 * You can call BindToClose with no argument to 'unbind' and revert to the default behavior.
	 *
	 * - **ThreadSafety**: Unsafe
	 *
	 * [Creator Hub](https://create.roblox.com/docs/reference/engine/classes/PluginGui#BindToClose)
	 */
	BindToClose(callback?: () => void): void;

	/**
	 * The title that is displayed above the contents of the PluginGui. Defaults to empty string.
	 *
	 * - **ThreadSafety**: ReadSafe
	 *
	 * [Creator Hub](https://create.roblox.com/docs/reference/engine/classes/PluginGui#Title)
	 */
	Title: string;
}

//#region component-interface
export interface PluginWidgetProps {
	/**
	 * `children` is handled by React, do not use.
	 */
	children: ReactNode;

	/**
	 * A **unique** name to pass when creating the widget
	 */
	id: string;

	/**
	 * A display title for the widget
	 * Defaults to `id`
	 */
	title?: string;

	/**
	 * Whether or not the Widget is enabled
	 * Must be provided, see [documentation](https://raineyraine.github.io/PluginComponents/api/plugin-components/PluginWidget.html) for details
	 */
	enabled: boolean;

	/**
	 * Initial dock state of the widget
	 */
	initialDockState?: Enum.InitialDockState;

	/**
	 * Minimum size of the widget, as a Vector2
	 */
	minSize?: Vector2;

	/**
	 * Initial size of the widget, when floated
	 */
	initialFloatSize?: Vector2;

	/**
	 * ZIndexBehavior for the widget
	 * Defaults to `Enum.ZIndexBehavior.Sibling` for more expected behavior
	 */
	zIndexBehavior?: Enum.ZIndexBehavior;
	onFocusLost?: () => void;
	onFocused?: () => void;
	onSizeChange?: (size: Vector2) => void;
	onClose?: () => void;
}
//#endregion component-interface

export default function PluginWidget({
	children,
	id,
	title = id,
	enabled,
	initialDockState,
	minSize,
	initialFloatSize,
	zIndexBehavior = Enum.ZIndexBehavior.Sibling,
	onFocusLost,
	onFocused,
	onSizeChange,
	onClose,
}: PluginWidgetProps) {
	const plugin = useContext(PluginContext);

	const [dockWidget, setDockWidget] = useState(undefined as unknown as CustomDockWidgetPluginGui);

	const dockWidgetInfo = useMemo(
		() =>
			new DockWidgetPluginGuiInfo(
				initialDockState,
				true,
				false,
				initialFloatSize?.X,
				initialFloatSize?.Y,
				minSize?.X,
				minSize?.Y,
			),
		[],
	);

	// Create DockWidgetPluginGui
	useEffect(() => {
		const newWidget = plugin.CreateDockWidgetPluginGui(id, dockWidgetInfo) as CustomDockWidgetPluginGui;
		newWidget.Name = title;
		newWidget.ResetOnSpawn = false;
		newWidget.Title = title;
		newWidget.Enabled = enabled;
		newWidget.ZIndexBehavior = zIndexBehavior;

		setDockWidget(newWidget);

		return () => {
			newWidget.Destroy();
		};
	}, [id, dockWidgetInfo]);

	// Handle onClose
	useEffect(() => {
		if (dockWidget && onClose) {
			dockWidget.BindToClose(onClose);

			return () => dockWidget.BindToClose();
		}
	}, [dockWidget, onClose]);

	// Handle onSizeChange
	useEffect(() => {
		if (dockWidget && onSizeChange) {
			const conn = dockWidget
				.GetPropertyChangedSignal("AbsoluteSize")
				.Connect(() => onSizeChange(dockWidget.AbsoluteSize));

			return () => conn.Disconnect();
		}
	}, [dockWidget, onSizeChange]);

	// Handle onFocusLost
	useEffect(() => {
		if (dockWidget && onFocusLost) {
			const conn = dockWidget.WindowFocusReleased.Connect(onFocusLost);

			return () => conn.Disconnect();
		}
	}, [dockWidget, onSizeChange]);

	// Handle onFocused
	useEffect(() => {
		if (dockWidget && onFocused) {
			const conn = dockWidget.WindowFocused.Connect(onFocused);

			return () => conn.Disconnect();
		}
	}, [dockWidget, onSizeChange]);

	const widgetChildren = (
		<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)} BorderSizePixel={0}>
			<WidgetContext.Provider value={dockWidget}>{children}</WidgetContext.Provider>
		</frame>
	);

	return dockWidget ? createPortal(widgetChildren, dockWidget) : undefined;
}
