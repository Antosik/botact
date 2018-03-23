interface BotactSettings {
    confirmation: string;
    token: string;
    group_id?: number;
}

interface IBotactMsg {
    body?: string

    attachments?: any[]
    forwarded?: IBotactMsg
}

interface IBotactActions {
    events: ({ event: string, callback:(ctx: IBotactCtx) => any })[];
    on: ({ type: () => void | string, callback?: (ctx: IBotactCtx) => any })[];
    middlewares: ((ctx: IBotactCtx) => any)[];
}

interface IBotactExecuteItem {
    code: string;
    callback: (response: any) => any;

    result: Promise<any>
    resolve: (value: any) => void;              // needed to resolve result after successful execution
    reject: (reason: any) => void;              // needed to reject result after execution error
}

interface IBotactExecuteMethods {
    access_token: string;
    items: IBotactExecuteItem[]
}

interface IBotactCore {
    /* async */ api(method: string, options?: any /* = {}*/): Promise<any>;
    /* async */ uploadDocument(filepath: string, peer_id: number, type: 'doc' | 'audio_message' /* = 'doc' */): Promise<any>;
    /* async */ uploadPhoto(filepath: string, peer_id: number): Promise<any>;
    /* async */ uploadCover(filepath: string, settings?: any): Promise<any>;
    /* async */ execute(method: string, settings?: any, callback?: (response: any) => any): Promise<any>;
}


interface IBotactCtx extends IBotactCore, IBotactMsg {
    /* async */ reply(message: string, attachment?: string): Promise<any>;
    /* async */ sendMessage(user_id: number, message: string, attachment?: string): Promise<any>

    body?: string;
    group_id?: number | undefined
    user_id?: number | undefined
}

export declare class Botact implements IBotactCore {
    // fields
    private actions: IBotactActions;
    private methods: IBotactExecuteMethods[];
    settings: BotactSettings;

    // core
    constructor(settings: BotactSettings);
    private executeHandler(methods: IBotactExecuteMethods[]): void;
    private /* async */ handler(ctx: IBotactCtx): any;
    /* async */ api(method: string, options?: any /* = {}*/): Promise<any>;
    /* async */ execute(method: string, settings?: any, callback?: (response: any) => any): Promise<any>;
    /* async */ listen(req: any, res: any): Promise<Botact>; // TODO: add typings for Express Request & Response
    /* async */ reply(user_id: number, message: string, attachment?: string): Promise<any>;

    // actions
    event(event: string | string[], callback: (ctx: IBotactCtx) => any): Botact;
    on(type: (ctx: IBotactCtx) => any | string, callback?: (ctx: IBotactCtx) => any): Botact;  // TODO: change this D:
    use(callback: (ctx: IBotactCtx) => any): Botact;

    // helpers
    private getLastMessage(message: any): any;
    /* async */ uploadCover(filepath: string, settings?: any): Promise<any>;
    /* async */ uploadDocument(filepath: string, peer_id: number, type: 'doc' | 'audio_message' /* = 'doc' */): Promise<any>;
    /* async */ uploadPhoto(filepath: string, peer_id: number): Promise<any>;
}

export declare function /* async */ api(method: string, options?: any /* = {}*/): Promise<any>;
export declare function getLastMessage(message: any): any;