declare type Corporation = {
    id: number;
    name: string;
    icon: string;
};

declare type CorporationRequest = {
    name: string;
    icon: string;
    [index: string]: string;
};
