import { divIcon } from 'leaflet';

export const getMarkerPin = (color, highlighted) => {

    const size = highlighted ? 2: 1;

    const markerHtmlStyles = `
    background-color: ${color};
    width: ${size}rem;
    height: ${size}rem;
    display: block;
    left: -${size/2}rem;
    top: -${size/2}rem;
    position: relative;
    border-radius: ${size}rem ${size}rem 0;
    transform: rotate(45deg);
    border: 1px solid #000000;`

    const icon = divIcon({
    className: "marker-pin",
    iconAnchor: [0, 12*size],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -22*size],
    html: `<span style="${markerHtmlStyles}">`
    })
    return icon
}
