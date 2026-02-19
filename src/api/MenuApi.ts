import { ApiClient } from "./ApiClient";
import { Menu } from "../components/types/Menu";

export const fetchMenus = async (): Promise<Menu[]> => {
    const res = await ApiClient.get<Menu[]>("/menu/init");
    return res.data;
};