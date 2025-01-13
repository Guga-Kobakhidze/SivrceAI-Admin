import SportsForm from './SportsForm'

const SpotsEdit = () => {
  const defaultValues = {
    spotName: 'Lashas bari',
    spotTitle: 'Lashas bari',
    spotDescription: 'The Shortest Description',
    pricePerPerson: '200',
    spotNumber: '15',
    spotAddress: 'samzareulos gamziri',
    spotImages: [
      'https://sivrce.ai/_next/static/media/details1.7f8a7c47.svg',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/70/12/8b/evening-at-drunk-owl.jpg?w=600&h=-1&s=1',
      'https://images.squarespace-cdn.com/content/v1/648331aed0f6882fac88a261/d1dc395b-c60c-4dc1-b683-d8757d86ddb7/barlesieur-9.jpg',
    ],
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return <SportsForm defaultValues={defaultValues} onSubmit={onSubmit} isEdit />
}

export default SpotsEdit
