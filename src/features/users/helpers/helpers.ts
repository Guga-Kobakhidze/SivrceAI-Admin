export type StatusType = 'pending' | 'rejected' | 'accepted'

const statusOptions = {
  pending: { title: 'Pending', bgColor: '#3B82F6' },
  rejected: { title: 'Rejected', bgColor: '#EF4444' },
  accepted: { title: 'Accepted', bgColor: '#10B981' },
}

export const getStatusOption = (status: StatusType) => {
  return statusOptions[status]
}
