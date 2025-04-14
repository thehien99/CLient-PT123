const extractHouseNumber = (address) => {
    const regex = /^\s*(Địa chỉ:|Số nhà:|Số:)?\s*([\w/.\-]+)\s+(?=Phường|Xã|Thị trấn|Quận|Huyện|TP|Tỉnh|Thành phố|P\.|Q\.|Tx\.)/i;
    const match = address && address.match(regex);
    return match ? match[2] : null;
}
export default extractHouseNumber