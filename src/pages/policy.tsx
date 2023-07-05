/* eslint-disable @typescript-eslint/naming-convention */
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

// const class = dynamic(() => import('url'));

const chinh_sach_bao_mat = () => {
	return (
		<>
			<style global jsx>{`
				html,
				body {
					background-color: black;
					color: white;
				}
			`}</style>
			Chính sách bảo mật A. BẢO MẬT THÔNG TIN Chúng tôi hiểu rõ sự riêng tư của khách hàng là điều vô cùng quan trọng. Vì vậy, digitop chỉ thu
			thập những thông tin cần thiết có liên quan đến giao dịch giữa chúng tôi và khách hàng. Đồng thời cũng sẽ chỉ sử dụng tên và một số thông
			tin khác của khách hàng trong phạm vi và mục đích được đề ra trong Chính sách Bảo mật thông tin này. Quý khách hàng có thể truy cập
			website… mà không cần phải cung cấp bất kì thông tin cá nhân nào trừ khi quý khách thực hiện thao tác thanh toán đơn hàng trên hệ thống
			website. Nếu quý khách có ý kiến đóng góp, xin vui lòng gửi email đến hello@digitop.vn, chúng tôi luôn sẵn sàng lắng nghe những nhận xét
			từ quý khách. Quy định Bảo mật thông tin của digitop hoàn toàn tuân theo Quy định của Pháp luật về Bảo mật thông tin cá nhân. Mục đích thu
			thập thông tin digitop không sử dụng thông tin cá nhân của khách hàng thu thập từ website để bán, chia sẻ hay trao đổi cho một bên thứ ba
			nào khác. Thông tin cá nhân của khách hàng sẽ chỉ được sử dụng trong nội bộ công ty với những mục đích được đề ra tại Chính sách Bảo mật
			thông tin này. Phạm vi sử dụng thông tin cá nhân Khi quý khách tạo đơn hàng tại website digitop.vn, thông tin cá nhân mà chúng tôi cần thu
			thập bao gồm: Tên Email Số điện thoại Địa chỉ giao hàng Những thông tin trên được thu thập nhằm sử dụng cho một hoặc tất cả các mục đích
			sau: Giao hàng quý khách đã đặt mua tại digitop.vn Thông báo về việc giao hàng và hỗ trợ khách hàng Cung cấp các thông tin liên quan đến
			sản phẩm tại digitop.vn Xử lý đơn đặt hàng và cung cấp dịch vụ, thông tin qua website của chúng tôi theo yêu cầu của quý khách. Ngoài ra,
			Xin Chao sẽ sử dụng các thông tin do quý khách cung cấp để hỗ trợ quản lý đơn hàng của quý khách, xác nhận và thực hiện các giao dịch tài
			chính liên quan đến thanh toán trực tuyến; cải thiện giao diện và/hoặc nội dung của các mục trên website; nhận diện khách truy cập
			website; khảo sát, nghiên cứu về nhân khẩu học của khách hàng digitop; gửi đến quý khách những thông tin do quý khách yêu cầu hoặc những
			thông tin mà chúng tôi nghĩ sẽ có ích với điều kiện quý khách đồng ý. digitopcó thể cung cấp tên, số điện thoại và địa chỉ của khách hàng
			đến dịch vụ vận chuyển để tiến hành giao hàng cho quý khách. Khi quý khách hàng tạo đơn hàng trên website digitop.vn chúng tôi sẽ sử dụng
			thông tin cá nhân của quý khách để gửi các thông tin tiếp thị. Khách hàng có thể từ chối nhận các thông tin đó bất kỳ lúc nào bằng cách sử
			dụng chức năng hủy đăng ký trong các thông báo quảng cáo. Khách hàng có thể kiểm tra thông tin đơn hàng bằng cách truy cập vào tài khoản
			email. Tại đó, quý khách có thể kiểm tra và theo dõi đầy đủ các thông tin liên quan đến đơn hàng đã hoàn tất, đơn hàng mở, đơn hàng sắp
			được giao. Thời gian lưu trữ thông tin Chúng tôi không cung cấp thông tin cá nhân khách hàng cho bất kỳ bên thứ ba nào trừ trường hợp phải
			thực hiện theo yêu cầu của các cơ quan Nhà nước có thẩm quyền, hoặc theo quy định của pháp luật, hoặc khi việc cung cấp thông tin đó là
			cần thiết để chúng tôi cung cấp dịch vụ/ tiện ích cho khách hàng (ví dụ: cung cấp các thông tin giao nhận cần thiết cho các đơn vị đối tác
			vận chuyển…). digitop có thể chia sẻ thông tin cá nhân khách hàng cho các mục đích sau: Nghiên cứu thị trường và các báo cáo phân tích:
			digitop có thể dùng thông tin cá nhân khách hàng để nghiên cứu thị trường, tổng hợp, phân tích thông tin chung của khách hàng (ví dụ độ
			tuổi trung bình, khu vực địa lý), thông tin chi tiết sẽ được ẩn và chỉ được dùng để phục vụ công việc thống kê. Trong trường hợp digitop
			tiến hành khảo sát cần sự tham gia của khách hàng, bất kỳ câu trả lời cho khảo sát hoặc thăm dò dư luận mà khách hàng cung cấp cho Đông
			Hải sẽ không được chuyển cho bất kỳ bên thứ ba nào. Trao đổi thông tin cá nhân khách hàng với các đối tác quảng cáo: Hệ thống theo dõi
			hành vi của khách hàng được digitop sử dụng trên kênh hiển thị quảng cáo (ví dụ như tiếp thị lại khách hàng, hệ thống quản lý các chiến
			dịch quảng cáo DoubleClick, báo cáo về nhân khẩu, sở thích của khách hàng với công cụ Google Analytics...) có thể thu thập được các thông
			tin như độ tuổi, giới tính, sở thích và số lần tương tác với số lần xuất hiện của quảng cáo. Với tính năng cài đặt quảng cáo, khách hàng
			có thể lựa chọn thoát ra khỏi tính năng theo dõi hành vi khách hàng của Google Analytics và lựa chọn cách xuất hiện của kênh hiển thị
			quảng cáo trên Google. Cam kết bảo mật thông tin khách hàng Thông tin cá nhân của khách hàng trên website stayandplay.vn được chúng tôi
			cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của digitop. Việc thu thập và sử dụng thông tin của mỗi khách hàng chỉ
			được thực hiện khi có sự đồng ý của khách hàng đó, trừ những trường hợp pháp luật có quy định khác. Chúng tôi cam kết: Không sử dụng,
			không chuyển giao, cung cấp hay tiết lộ cho bên thứ ba nào về thông tin cá nhân của khách hàng khi không có sự cho phép hoặc đồng ý từ
			khách hàng, trừ những trường hợp pháp luật có quy định khác. Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát
			dữ liệu cá nhân khách hàng, chúng tôi sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho
			khách hàng được biết. Địa chỉ của đơn vị thu thập thông tin, quản lý thông tin và hỗ trợ khách hàng Tên công ty: CÔNG TY TNHH GIẢI TRÍ XIN
			CHÀO Tên tắt: digitop MST: 0317520801 Địa chỉ: L17-11, Tầng 17, Toà nhà Vincom Center, 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, Thành Phố
			Hồ Chí Minh, Việt Nam. Hotline: 028 6673 8686 Email: hello@digitop.vn B. BẢO MẬT THANH TOÁN digitop luôn coi trọng việc bảo mật thông tin
			và sử dụng các biện pháp tốt nhất để bảo vệ thông tin cá nhân của quý khách trong quá trình thanh toán. Quý khách không được sử dụng bất
			kỳ chương trình, công cụ hay hình thức nào để can thiệp vào hệ thống làm thay đổi cấu trúc dữ liệu. Cá nhân hay tổ chức có hành vi can
			thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống sẽ bị tước bỏ mọi quyền lợi cũng như bị truy tố trước pháp luật nếu cần thiết. Tất
			cả thông tin giao dịch đều được bảo mật trừ trường hợp phải thực hiện theo yêu cầu của cơ quan Nhà nước có thẩm quyền. Mục đích áp dụng Hệ
			thống thanh toán thẻ trên website digitop.vn được cung cấp bởi các đối tác cổng thanh toán đã được cấp phép hoạt động hợp pháp tại Việt
			Nam (“Đối Tác Cổng Thanh Toán”). Theo đó, các tiêu chuẩn bảo mật thanh toán thẻ của Stay & Play đảm bảo tuân thủ theo các tiêu chuẩn bảo
			mật của Đối Tác Cổng Thanh Toán. Ngoài ra, chúng tôi còn có các tiêu chuẩn bảo mật giao dịch thanh toán riêng, đảm bảo an toàn các thông
			tin thanh toán của khách hàng.
		</>
	);
};

export default chinh_sach_bao_mat;
