"use client"
import { CCard, CCardBody, CCardImage, CCardLink, CCardText, CCardTitle, CListGroup, CListGroupItem } from '@coreui/react';
import { useTheme } from '../context/ThemeContext';

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
    const { selectedTheme, themeStyles, setTheme } = useTheme();
    
    return (
    <CCard style={{ width: '18rem', background: themeStyles.primaryColor }}>
        <CCardImage orientation="top" src={image_url} />
        <CCardBody>
        <CCardTitle>item_type</CCardTitle>
        <CCardText style={{ color: themeStyles.textColor }}>
            {item_name}
        </CCardText>
        </CCardBody>
        <CListGroup flush>
        <CListGroupItem style={{ color: themeStyles.textColor }}>{destination}</CListGroupItem>
        <CListGroupItem style={{ color: themeStyles.textColor }}>{date}</CListGroupItem>
        <CListGroupItem style={{ color: themeStyles.textColor }}>{timestamp}</CListGroupItem>
        <CListGroupItem style={{ color: themeStyles.textColor }}>{price}</CListGroupItem>
        </CListGroup>
        <CCardBody>
        </CCardBody>
    </CCard>
)
}