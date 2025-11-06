import { useContext } from "@rbxts/react";
import PluginContext from "../../contexts/plugin/PluginContext";

export default function usePlugin() {
	return useContext(PluginContext);
}
