export type Path<T> = {
    pergunta: T,
    caminhosNao: Path<T>[],
    caminhosSim: Path<T>[],
}

export function tree<T>(arr: T[]) {
    if (arr.length === 1) return [{ pergunta: arr[0], caminhosNao: [], caminhosSim: [] }] as Path<T>[]
    if (arr.length === 0) return [] as Path<T>[]

    const result = [] as Path<T>[]

    const middle = getMiddleIndex(arr, false)

    if (Array.isArray(middle)) {
        for (const mid of middle) {
            const [left, right] = partition(arr, (_, i) => i < mid)
            result.push({
                pergunta: arr[mid], 
                caminhosNao: tree(left),
                caminhosSim: tree(right.filter(x => x !== arr[mid]))
            })
        }
    } else {
        const [left, right] = partition(arr, (_, i) => i < middle)
        result.push({
            pergunta: arr[middle],
            caminhosNao: tree(left),
            caminhosSim: tree(right.filter(x => x !== arr[middle])),
        })
        
    }
    
    return result
}


export function partition<T>(array: T[], predicate: (elem: T, i: number, arr: T[]) => Boolean) {
    return array.reduce(
        ([pass, fail], elem, i, arr) => (predicate(elem, i, arr) ? [[...pass, elem], fail] : [pass, [...fail, elem]]),
        [[], []] as T[][]
    );
}
export function getMiddleIndex<T>(array: T[], chooseOne = true) {
    const length = array.length;

    if (length === 0) {
        return -1
    }

    const midIndex = Math.floor(length / 2);

    // If the length is odd, return the middle element
    if (length % 2 === 1) {
        return midIndex
    } else if (chooseOne) {
        // If the length is even, return a random middle element
        const randomIndex = Math.random() < 0.5 ? midIndex - 1 : midIndex;
        return randomIndex
    } else {
        return [midIndex-1, midIndex]
    }
}

export function shuffle<T>(array: T[]) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]]; // Swap elements
    }
    return result;
}