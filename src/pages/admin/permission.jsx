import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Button,
  message,
  notification,
  Popconfirm,
  Space,
} from 'antd';
import { DeleteOutlined, EditOutlined, MenuUnfoldOutlined, PlusOutlined } from '@ant-design/icons';
import { sfLike } from 'spring-filter-query-builder';
import queryString from 'query-string';

import DataTable from '../../components/data-table';
import { callDeletePermission } from '../../config/api.permission';
import { fetchPermission } from '../../redux/slice/permissionSlice';
import ModalPermission from '../../components/modal/modal.permission';
import ViewDetailPermission from '../../components/modal/view.permission';

const PermissionPage = () => {
  const tableRef = useRef();
  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const [dataInit, setDataInit] = useState(null);

  const isFetching = useSelector((state) => state.permission.isFetching);
  const meta = useSelector((state) => state.permission.meta);
  const permissions = useSelector((state) => state.permission.result);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const handleDeletePermission = async (id) => {
    if (id) {
      const res = await callDeletePermission(id);
      if (res && +res.statusCode === 200) {
        message.success('Xóa permission thành công');
        reloadTable();
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description: res.message,
        });
      }
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: 50,
      align: 'center',
      render: (text, record, index) => {
        return <>{index + 1 + (meta.page - 1) * meta.pageSize}</>;
      },
      hideInSearch: true,
    },
    {
      title: 'API',
      dataIndex: 'apiPath',
      sorter: true,

    },

    {
      title: 'Method',
      dataIndex: 'method',
      render: (_value, entity) => {
        let color;
        switch (entity.method) {
          case 'PUT':
            color = '#faad14';
            break;
          case 'GET':
            color = '#52c41a';
            break;
          case 'DELETE':
            color = '#1890ff';
            break;
          default:
            color = '#d9d9d9';
        }
        return <Badge count={entity.method} showZero color={color} />;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Module',
      dataIndex: 'module',
      hideInSearch: true,
    },
    {
      title: 'Actions',
      hideInSearch: true,
      width: 50,
      render: (_value, entity) => (
        <Space>
          <EditOutlined
            style={{
              fontSize: 20,
              color: '#ffa500',
            }}
            onClick={() => {
              setOpenModal(true);
              setDataInit(entity);
            }}
          />
          <MenuUnfoldOutlined

            style={{
              fontSize: 20,
              color: '#1890ff',
            }}
            onClick={() => {
              setOpenViewDetail(true);
              setDataInit(entity);
            }}
          />

          <Popconfirm
            placement='leftTop'
            title='Xác nhận xóa quyền này ?'
            description='Bạn có chắc chắn muốn xóa vaccine này ?'
            onConfirm={() => handleDeletePermission(entity.id)}
            okText='Xác nhận'
            cancelText='Hủy'
          >
            <span style={{ cursor: 'pointer', margin: '0' }}>
              <DeleteOutlined
                style={{
                  fontSize: 20,
                  color: '#ff4d4f',
                }}
              />
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const buildQuery = (params, sort) => {
    const clone = { ...params };
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: '',
    };

    if (clone.name)
      q.filter = `${sfLike('name', clone.name)}`;
    if (clone.manufacturer) {
      q.filter = clone.name
        ? q.filter + ' and ' + `${sfLike('manufacturer', clone.manufacturer)}`
        : `${sfLike('manufacturer', clone.manufacturer)}`;
    }

    if (!q.filter) delete q.filter;

    let temp = queryString.stringify(q);

    let sortBy = '';
    if (sort && sort.name) {
      sortBy =
        sort.name === 'ascend'
          ? 'sort=name,asc'
          : 'sort=name,desc';
    }
    if (sort && sort.manufacturer) {
      sortBy =
        sort.manufacturer === 'ascend'
          ? 'sort=manufacturer,asc'
          : 'sort=manufacturer,desc';
    }

    if (sort && sort.price) {
      sortBy = sort.price === 'ascend' ? 'sort=price,asc' : 'sort=price,desc';
    }
    if (sort && sort.stockQuantity) {
      sortBy =
        sort.stockQuantity === 'ascend'
          ? 'sort=stockQuantity,asc'
          : 'sort=stockQuantity,desc';
    }
    temp = `${temp}&${sortBy}`;

    return temp;
  };

  return (
    <>
      <DataTable
        actionRef={tableRef}
        headerTitle='Danh sách Quyền'
        rowKey='id'
        loading={isFetching}
        columns={columns}
        dataSource={permissions}
        request={async (params, sort, filter) => {
          const query = buildQuery(params, sort, filter);
          dispatch(fetchPermission({ query }));
        }}
        scroll={{ x: true }}
        pagination={{
          current: meta.page,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        rowSelection={false}
        toolBarRender={() => {
          return (
            <Button
              icon={<PlusOutlined />}
              type='primary'
              onClick={() => setOpenModal(true)}
            >
              Thêm mới
            </Button>
          );
        }}
      />
      <ModalPermission
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
      <ViewDetailPermission
        onClose={setOpenViewDetail}
        open={openViewDetail}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </>
  );
};
export default PermissionPage;
