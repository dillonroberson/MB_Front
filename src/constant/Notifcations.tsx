export type Notification = {
  id: number;
  title: string;
  content: string;
  time: number;
}

export const notifications: Notification[] = [
  {
    id: 1,
    title: '⛔ Cảnh báo giả mạo ngân hàng mới mở thẻ tín dụng',
    content: '⚠️Trước tình trạng giả mạo ngân hàng mời mở thẻ tín dụng/nâng hạn mức tín dụng để chiếm đoạt tài sản. Quý khách lưu ý luôn cẩn trọng với mọi đề nghị ...',
    time: new Date(new Date().getTime() - 25 * 60 * 60 * 1000).getTime()
  },
  {
    id: 2,
    title: '🆘 Cảnh báo các thủ đoạn lừa đảo cần lưu ý',
    content: 'Với hiện trạng đang có rất nhiều thủ đoạn lừa đảo và chiếm đoạt tài sản, MB xin gửi bạn thông tin tổng hợp về các thủ đoạn có mặt trên thị trường và b...',
    time: new Date(new Date().getTime() - 26 * 60 * 60 * 1000).getTime()
  },
  {
    id: 3,
    title: 'Thông báo thay đổi tần xuất thanh toán tự động hoá đơn điện của EVN Hà Nội',
    content: 'Dịch vụ thanh toán tự động tiền điện của EVN Hà Nội tại MB sẽ thực hiện tự động thanh toán hàng ngày bắt đầu từ ngày EVN Hà Nội phát hành hoá đơn để đ...',
    time: new Date("2023-07-11T15:02:31").getTime()
  },
  {
    id: 4,
    title: 'Thông báo Chính sách bảo vệ dữ liệu cá nhân ',
    content: 'Theo Nghị định số 13/2023/NĐ-CP của Chính phủ về Bảo vệ dữ liệu cá nhân của MB được cập nhật từ 01/07/...',
    time: new Date("2023-07-14T19:02:05").getTime()
  },
  {
    id: 5,
    title: '⚠️ Thông báo thu phí thanh toán dịch vụ quảng cáo bằng thẻ MB',
    content: 'Từ 6/7/2023 MB sẽ thu một lần duy nhất phí dịch vụ thanh toán GD quảng cáo (Facebook, Google, Tiktok,...) bằng thẻ MB với mức phí 220.000đ mỗi thẻ...',
    time: new Date("2023-07-04T11:31:14").getTime()
  },
  
  
]

