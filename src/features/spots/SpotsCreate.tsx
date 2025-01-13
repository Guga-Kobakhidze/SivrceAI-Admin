import SportForm from './SportsForm'

const SpotCreate = () => {
  const defaultValues = {
    spotName: '',
    spotTitle: '',
    spotDescription: '',
    pricePerPerson: '',
    spotNumber: '',
    spotAddress: '',
    spotImages: [],
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return <SportForm defaultValues={defaultValues} onSubmit={onSubmit} />
}

export default SpotCreate
