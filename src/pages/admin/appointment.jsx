/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Tag } from 'antd';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';

import DataTable from '../../components/data-table';
import ModalAppointment from '../../components/modal/modal.appointment';

const AppointmentPage = () => {
  const tableRef = useRef();

  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const [dataInit, setDataInit] = useState(null);

  const isFetching = useSelector((state) => state.appointment.isFetching);
  const meta = useSelector((state) => state.appointment.meta);
  const appointments = useSelector((state) => state.appointment.result);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    {
      title: 'No.',
      key: 'index',
      width: 50,
      align: 'center',
      render: (text, record, index) => {
        return <>{index + 1 + (meta.page - 1) * meta.pageSize}</>;
      },
      hideInSearch: true,
    },
    {
      title: 'Vaccine',
      dataIndex: 'vaccineName',
    },
    {
      title: 'Patient',
      dataIndex: 'patientName',
    },
    {
      title: 'Doctor',
      dataIndex: 'doctorName',
      render: (_value, entity) => {
        return entity.doctorName || (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Update Now
          </Tag>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'appointmentDate',
    },
    {
      title: 'Time',
      dataIndex: 'appointmentTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_value, entity) => {
        let color;
        switch (entity.status) {
          case 'PENDING':
            color = '#faad14';
            break;
          case 'COMPLETED':
            color = '#1890ff';
            break;
          case 'PROCESSING':
            color = '#52c41a';
            break;
          default:
            color = 'gray';
        }
        return <Badge count={entity.status} showZero color={color} />;
      },
    },
    {
      title: 'Actions',
      hideInSearch: true,
      width: 50,
      render: (_value, entity) =>
        entity.status === 'PENDING' ? (

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

        ) : null,
    },
  ];

  return (
    <>
      <DataTable
        actionRef={tableRef}
        headerTitle="Appointment List"
        rowKey="appointId"
        loading={isFetching}
        columns={columns}
        dataSource={appointments}
        search={false}
        scroll={{ x: true }}
        pagination={{
          current: meta.page,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} of {total} rows
              </div>
            );
          },
        }}
        rowSelection={false}
      />
      <ModalAppointment
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </>
  );
};

export default AppointmentPage;