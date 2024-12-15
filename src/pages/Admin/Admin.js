import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminFooter from '../../components/AdminFooter/AdminFooter';
import SidebarAdmin from '../../components/SidebarAdmin/SidebarAdmin';
import './Admin.scss';

const Admin = () => {
  return (
    <div className='wrapper-admin'>
      <AdminHeader />
      <div className='content-admin'>
        <SidebarAdmin />
        <div className='content'>
          <h3>Quy định về việc sử dụng hệ thống</h3>
          <div className='wrapper'>
            <ul>
              <li>
                Bí mật thông tin đăng nhập: Bạn nên giữ thông tin đăng nhập của tài khoản admin một
                cách bảo mật và không chia sẻ với bất kỳ ai khác. Điều này đảm bảo rằng chỉ có bạn
                và những người được ủy quyền mới có thể truy cập vào tài khoản admin.!
              </li>
              <li>
                Mật khẩu mạnh: Đảm bảo rằng mật khẩu của tài khoản admin là một mật khẩu mạnh, bao
                gồm cả chữ hoa, chữ thường, số và ký tự đặc biệt. Tránh sử dụng các mật khẩu dễ đoán
                như ngày sinh, tên đăng nhập hoặc thông tin cá nhân khác.
              </li>
              <li>
                Đổi mật khẩu định kỳ: Thay đổi mật khẩu của tài khoản admin định kỳ, ví dụ như mỗi 3
                tháng hoặc 6 tháng một lần. Điều này giúp ngăn chặn những người không được ủy quyền
                từ việc truy cập vào tài khoản admin nếu mật khẩu đã bị lộ.
              </li>
              <li>
                Giới hạn quyền hạn: Chỉ cung cấp các quyền hạn admin cần thiết để thực hiện nhiệm vụ
                của mình. Nếu có thể, hạn chế quyền admin chỉ cho phép truy cập và thực hiện các
                thao tác cần thiết. Điều này giúp giảm khả năng lạm dụng quyền hạn và bảo vệ trang
                web khỏi các hành động không mong muốn.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default Admin;
