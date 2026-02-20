import { useEffect, useState } from "react";
import { Menu } from "../components/types/Menu";
import { fetchMenus } from "../api/MenuApi";

export const UseMenus = () => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMenus()
            .then(setMenus)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return { menus, loading, error };
};