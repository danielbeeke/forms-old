export const importGlobalScript = async (url: string, name: string) => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = url
        script.onload = () => {
            resolve(window[name])
        }
        document.head.appendChild(script)    
    })    
}