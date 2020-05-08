import { auth, db } from './functions'

auth()
  .getRedirectResult()
  .then(result => {
    if (result.credential) {
      db()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get()
        .then(doc => {
          // Create the user doc if it doesn't exist
          if (!doc.exists) {
            db()
              .collection('users')
              .doc(auth().currentUser.uid)
              .set(
                {
                  name: auth().currentUser.displayName,
                  picture: auth().currentUser.photoURL,
                  uid: auth().currentUser.uid,
                  isAdmin: false,
                  isBanned: false
                },
                {
                  merge: true
                }
              )
              .then(() => {
                window.location.reload()
              })
              .catch(err => {
                console.error('An error occurred while creating the users doc.')
                console.error(err)
              })
          } else {
            // If the user doc does exists, update the data
            db()
              .collection('users')
              .doc(auth().currentUser.uid)
              .set(
                {
                  name: auth().currentUser.displayName,
                  picture: auth().currentUser.photoURL,
                  uid: auth().currentUser.uid
                },
                {
                  merge: true
                }
              )
              .then(() => {
                // Update all of the data in the user's stories docs
                db()
                  .collection('stories')
                  .where('authorUid', '==', auth().currentUser.uid)
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                      doc.ref.set(
                        {
                          authorPicture: auth().currentUser.photoURL,
                          authorName: auth().currentUser.displayName
                        },
                        { merge: true }
                      )
                    })
                  })
                  .then(() => {
                    window.location.reload()
                  })
                  .catch(err => {
                    console.error(
                      'An error occurred while updating the stories docs.'
                    )
                    console.error(err)
                  })
              })
              .catch(err => {
                console.error('An error occurred while updating the users doc.')
                console.error(err)
              })
          }
        })
    }
  })
  .catch(err => {
    console.error('An error occurred while executing the postLogin function.')
    console.error(err)
  })
