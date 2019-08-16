import { divIcon } from 'leaflet';

export const getMarkerPin = (color, highlighted) => {

    //const border = highlighted ? '3px solid #ffffff' : '1px solid #000000';
    const size = highlighted ? '2rem' : '1rem';

    const markerHtmlStyles = `
    background-color: ${color};
    width: ${size};
    height: ${size};
    display: block;
    left: -${size/2};
    top: -${size/2};
    position: relative;
    border-radius: ${size} ${size} 0;
    transform: rotate(45deg);
    border: 1px solid #000000;`

    const icon = divIcon({
    className: "marker-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}">`
    })
    return icon
}
