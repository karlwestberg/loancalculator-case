// AI generated

export default function addNumberSpacing(num:number) {
    // Add space every 3 digits
    return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
