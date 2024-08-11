import { CCard, CCardBody, CCardImage, CCardLink, CCardText, CCardTitle, CListGroup, CListGroupItem } from '@coreui/react';

interface ItemCardProps {
    image_url: string,
    item_name: string, 
    item_type: string,
    destination: string,
    date?: string,
    timestamp: number,
    price: string,
}

export const ItemCard: React.FC<ItemCardProps> = ({image_url, item_name, item_type, destination, date, timestamp, price}) => {
    return (
    <CCard style={{ width: '18rem' }}>
        <CCardImage orientation="top" src={image_url} />
        <CCardBody>
        <CCardTitle>item_type</CCardTitle>
        <CCardText>
            {item_name}
        </CCardText>
        </CCardBody>
        <CListGroup flush>
        <CListGroupItem>{destination}</CListGroupItem>
        <CListGroupItem>{date}</CListGroupItem>
        <CListGroupItem>{timestamp}</CListGroupItem>
        <CListGroupItem>{price}</CListGroupItem>
        </CListGroup>
        <CCardBody>
        </CCardBody>
    </CCard>
)
}