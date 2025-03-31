/* eslint-disable no-undef */
import { useEffect, useRef, useState } from 'react';
import { Badge, Popconfirm, Space, message, notification } from 'antd';
import { CheckSquareOutlined, CloseCircleOutlined } from '@ant-design/icons';

import DataTable from '../../components/data-table';
import { callCancelAppointment, callCompleteAppointment, callMySchedule } from '../../config/api.appointment';

const MySchedulePage = () => {
    const tableRef = useRef();

    const reloadTable = () => {
        tableRef?.current?.reload();
    };

    const [isFetching, setFetching] = useState(false);
    const [listSchedule, setListSchedule] = useState([]);
    const [meta, setMeta] = useState({
        page: 1,
        pageSize: 10,
        pages: 0,
        total: 0,
    });

    const handleCancel = async (id) => {
        if (id) {
            const res = await callCancelAppointment(id);
            if (res && +res.statusCode === 200) {
                message.success('Appointment cancelled successfully');
                reloadTable();
            } else {
                notification.error({
                    message: res.error,
                    description: res.message,
                });
            }
        }
    };

    const handleComplete = async (id) => {
        if (id) {
            const res = await callCompleteAppointment(id);
            if (res && +res.statusCode === 200) {
                message.success('Appointment completed successfully');
                reloadTable();
            } else {
                notification.error({
                    message: res.error,
                    description: res.message,
                });
            }
        }
    };

    useEffect(() => {
        fetchMySchedule();
    }, []);

    const fetchMySchedule = async () => {
        setFetching(true);

        setTimeout(async () => {
            const res = await callMySchedule();
            if (res && res.data) {
                setMeta(res.data.meta);
                setListSchedule(res.data.result);
            }
            setFetching(false);
        }, 500);
    };

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
            title: 'Cashier',
            dataIndex: 'cashierName',
        },
        {
            title: 'Patient',
            dataIndex: 'patientName',
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
                    case 'CANCELLED':
                        color = '#f50';
                        break;
                    case 'COMPLETED':
                        color = '#1890ff';
                        break;
                    case 'PROCESSING':
                        color = '#52c41a';
                        break;
                    default:
                        color = 'gray'
                }
                return <Badge count={entity.status} showZero color={color} />;
            },
        },
        {
            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, entity) =>
                entity.status === 'PROCESSING' ? (
                    <Space>
                        <CheckSquareOutlined
                            style={{
                                fontSize: 20,
                                color: '#1be632',
                            }}
                            onClick={() => handleComplete(entity.appointmentId)}
                        />

                        <Popconfirm
                            placement="leftTop"
                            title="Confirm cancel appointment"
                            description="Are you sure you want to cancel this appointment?"
                            onConfirm={() => handleCancel(entity.appointmentId)}
                            okText="Confirm"
                            cancelText="Cancel"
                        >
                            <span style={{ cursor: 'pointer', margin: '0 10px' }}>
                                <CloseCircleOutlined
                                    style={{
                                        fontSize: 20,
                                        color: '#e22929',
                                    }}
                                />
                            </span>
                        </Popconfirm>
                    </Space>
                ) : null,
        },
    ];



    return (
        <>
            <DataTable
                actionRef={tableRef}
                headerTitle="Today's Doctor Appointment Schedule"
                rowKey="appointId"
                loading={isFetching}
                columns={columns}
                dataSource={listSchedule}
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
        </>
    );
};

export default MySchedulePage;