import React from 'react';

const DefaultImage = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#F5F5F7" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1615 10H25.8385C26.3657 9.99998 26.8205 9.99997 27.195 10.0306C27.5904 10.0629 27.9836 10.1342 28.362 10.327C28.9265 10.6146 29.3854 11.0735 29.673 11.638C29.8658 12.0164 29.9371 12.4096 29.9694 12.805C30 13.1795 30 13.6343 30 14.1614V25.8386C30 26.3657 30 26.8205 29.9694 27.195C29.9371 27.5904 29.8658 27.9836 29.673 28.362C29.3854 28.9265 28.9265 29.3854 28.362 29.673C27.9836 29.8658 27.5904 29.9371 27.195 29.9694C26.8205 30 26.3657 30 25.8386 30H14.1614C13.6343 30 13.1795 30 12.805 29.9694C12.4096 29.9371 12.0164 29.8658 11.638 29.673C11.0735 29.3854 10.6146 28.9265 10.327 28.362C10.1342 27.9836 10.0629 27.5904 10.0306 27.195C9.99997 26.8205 9.99998 26.3657 10 25.8385V14.1615C9.99998 13.6343 9.99997 13.1795 10.0306 12.805C10.0629 12.4096 10.1342 12.0164 10.327 11.638C10.6146 11.0735 11.0735 10.6146 11.638 10.327C12.0164 10.1342 12.4096 10.0629 12.805 10.0306C13.1795 9.99997 13.6343 9.99998 14.1615 10ZM12 18.4649V25.8C12 26.3766 12.0008 26.7488 12.0239 27.0322C12.0461 27.3038 12.0838 27.4045 12.109 27.454C12.2049 27.6422 12.3578 27.7951 12.546 27.891C12.5955 27.9162 12.6962 27.9539 12.9678 27.9761C13.2512 27.9992 13.6234 28 14.2 28H16L16 23.5681C16 23.3157 15.9999 23.0699 16.0169 22.8618C16.0356 22.6332 16.0797 22.3634 16.218 22.092C16.4097 21.7157 16.7157 21.4097 17.092 21.218C17.3634 21.0797 17.6332 21.0356 17.8618 21.0169C18.0699 20.9999 18.3157 21 18.5681 21H21.4319C21.6843 21 21.9301 20.9999 22.1382 21.0169C22.3668 21.0356 22.6366 21.0797 22.908 21.218C23.2843 21.4097 23.5903 21.7157 23.782 22.092C23.9203 22.3634 23.9644 22.6332 23.9831 22.8618C24.0001 23.0699 24 23.3157 24 23.5681L24 28H25.8C26.3766 28 26.7488 27.9992 27.0322 27.9761C27.3038 27.9539 27.4045 27.9162 27.454 27.891C27.6422 27.7951 27.7951 27.6422 27.891 27.454C27.9162 27.4045 27.9539 27.3038 27.9761 27.0322C27.9992 26.7488 28 26.3766 28 25.8V18.4649C27.4117 18.8052 26.7286 19 26 19C24.8053 19 23.7329 18.4762 23 17.6458C22.2671 18.4762 21.1947 19 20 19C18.8053 19 17.7329 18.4762 17 17.6458C16.2671 18.4762 15.1947 19 14 19C13.2714 19 12.5883 18.8052 12 18.4649ZM18 15C18 16.1046 18.8954 17 20 17C21.1046 17 22 16.1046 22 15C22 14.4477 22.4477 14 23 14C23.5523 14 24 14.4477 24 15C24 16.1046 24.8954 17 26 17C27.1046 17 28 16.1046 28 15V14.2C28 13.6234 27.9992 13.2512 27.9761 12.9678C27.9539 12.6962 27.9162 12.5955 27.891 12.546C27.7951 12.3579 27.6422 12.2049 27.454 12.109C27.4045 12.0838 27.3038 12.0461 27.0322 12.0239C26.7488 12.0008 26.3766 12 25.8 12H14.2C13.6234 12 13.2512 12.0008 12.9678 12.0239C12.6962 12.0461 12.5955 12.0838 12.546 12.109C12.3578 12.2049 12.2049 12.3578 12.109 12.546C12.0838 12.5955 12.0461 12.6962 12.0239 12.9678C12.0008 13.2512 12 13.6234 12 14.2V15C12 16.1046 12.8954 17 14 17C15.1046 17 16 16.1046 16 15C16 14.4477 16.4477 14 17 14C17.5523 14 18 14.4477 18 15ZM22 28V23.6C22 23.3035 21.9992 23.1412 21.9897 23.0246C21.9893 23.02 21.9889 23.0156 21.9886 23.0115C21.9844 23.0111 21.98 23.0107 21.9754 23.0103C21.8588 23.0008 21.6965 23 21.4 23H18.6C18.3035 23 18.1412 23.0008 18.0246 23.0103C18.02 23.0107 18.0156 23.0111 18.0114 23.0115C18.0111 23.0156 18.0107 23.02 18.0103 23.0246C18.0008 23.1412 18 23.3035 18 23.6V28H22Z"
        fill="#C5C5C9"
      />
    </svg>
  );
};

export default DefaultImage;
