import firebase_admin,uuid
from firebase_admin import firestore

cred=firebase_admin.credentials.Certificate("data/credentials.json")
app=firebase_admin.initialize_app(cred)
firestoredb=firestore.client()
petitionbase=firestoredb.collection("petitions")

def uploadPetition(title,text,author):
    uid=str(uuid.uuid1())
    data=dict(title=title,text=text,author=author,votes=0)
    petitionbase.document(uid).set(data)

def votePetition(uid):
    try:petition=petitionbase.get(uid)
    except:raise ValueError("No uid found with this name")
    votes=petition.get("votes")+1
    petition.update(votes=votes)

def getPetition():
    petitions=list()
    for petition in list(petitionbase.list_documents()):
        petitions.append((petition.get().get("votes"),petition.id))
    petitions.sort()
    petitions=[petition[1] for petition in petitions]
    return petitions