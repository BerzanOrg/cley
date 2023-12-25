type SplitWords<S extends string> =
    S extends '' ? never :
    S extends `${infer T} ${infer U}` ? [T, ...SplitWords<U>] :
    S extends `${infer K}` ? K extends '' ? never : [K] :
    never

type RemoveFirstWord<S extends string> = S extends '' ? never :
    S extends `${string} ${infer R}` ? R extends '' ? never : R : ''

type GetArgs<S extends string> = S extends `:${infer Arg}` ? Arg extends '' ? never : Arg : never
type GetFlags<S extends string> = S extends `-${infer Flag}` ? Flag extends '' ? never : Flag : never

type ArgsAndFlags<
    Str extends string,
    Rest extends string = RemoveFirstWord<Str>,
    Words extends string = SplitWords<Rest>[number],
    Args extends string = GetArgs<Words>,
    Flags extends string = GetFlags<Words>,
    IsMistaken = Rest extends '' ? false : Args extends never ? Flags extends never ? true : false : false,
> =
    IsMistaken extends true ? never : { [A in Args]: string } & { [F in Flags]?: string }

type Handler<P> = ((params: P) => void) | ((params: P) => Promise<void>)


export class Cley {
    private commands: { [key in string]?: Function } = {}

    start() {
        console.log('todo...')
    }

    command<
        const Command extends string,
    >(command: Command, handle: Handler<ArgsAndFlags<Command>>) {
        this.commands
        command
        handle

        return this
    }
}
