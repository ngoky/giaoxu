import DynamicTables from '@/admin/components/DynamicTables'
import { tableConstants } from '@/constants/tables.constants'
import { formatData } from '@/utils/format'
const headCells = [
    {
        visible: false,
        id: 'id',
        label: 'ID',
        numeric: true,
        format: { type: formatData.FORMAT_TYPE.INT },
        disablePadding: true
    },
    {
        visible: true,
        id: 'name',
        label: 'Name',
        numeric: false,
        disablePadding: true
    },
    {
        visible: true,
        id: 'activatedAt',
        label: 'Effected Date',
        numeric: false,
        disablePadding: true,
        format: { type: formatData.FORMAT_TYPE.DATE }
    }
]
export const TypeList = (props) => {
    const {
        onPageChange,
        onPageItemChange,
        data = [],
        editClick,
        deleteHandler
    } = props

    const editHandler = (event) => {
        event.stopPropagation()
        if (editClick) {
            editClick(event.target.id)
        }
    }

    const deleteHandle = (event) => {
        event.stopPropagation()
        if (deleteHandler) {
            deleteHandler(event.target.id)
        }
    }

    const actions = [
        {
            id: 1,
            type: tableConstants.ACTION_TYPE.BUTTON,
            handler: editHandler,
            label: 'Edit'
        },
        {
            id: 2,
            type: tableConstants.ACTION_TYPE.BUTTON,
            handler: deleteHandle,
            label: 'Delete'
        }
    ]

    const rows = formatData.formatDataByHeaderKey(data, headCells)

    return (
        <DynamicTables
            rows={rows}
            headCells={headCells}
            actions={actions || []}
            checkBox={false}
            onPageChange={onPageChange}
            onPageItemChange={onPageItemChange}
        />
    )
}
