
export function generateShareableLink(filterAmount: number | null, sortOrder: 'min' | 'max' | null): string {
    const baseUrl = window.location.href.split('?')[0]; //базовый URL без параметров
    const params = new URLSearchParams();  //объект для работы с URL-параметрами

//Передаём в url через params  фильтры filterAmount и сортировку sortOrder, если они есть:
    if (filterAmount !== null) {
        params.set('filterAmount', filterAmount.toString());
    }
    if (sortOrder) {
        params.set('sortOrder', sortOrder);
    }

    return `${baseUrl}?${params.toString()}`;  //возвращаем url типа .../?filterAmount=...&sortOrder=...
}
