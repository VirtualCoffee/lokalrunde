const { db } = require('./admin')

const locationData = require('./data/locations.json')

const importData = () => {
  locationData.forEach(async location => {
    // create top level document for location
    const docRef = await db.collection('locations').add(location.document)

    // create details document in details subcollection
    await docRef
      .collection('details')
      .doc('details')
      .set(location.details)

    // create products in products subcollection
    location.products.forEach(async product => {
      await docRef.collection('products').add(product)
    })
  })
}

importData()
