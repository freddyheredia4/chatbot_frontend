export interface Intent {
    id: number
    tag: string,
    patterns: string[],
    responses: string[],
    context: string[]
}