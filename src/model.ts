namespace Store {
    interface IStore {

    }
    interface ISidebar {
        active: number;
        items: ISidebarParent[];
    }
    interface ISidebarParent {
        id: number;
        title: string;
        open?: boolean;
    }
    interface ISidebarChild {
        id: number;
        title: string;
        href?:string;
    }
    namespace ISidebar{
        interface Index{
            
        }
    }
}