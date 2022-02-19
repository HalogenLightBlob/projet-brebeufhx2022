import firebase_admin,uuid,random
from firebase_admin import firestore

cred=firebase_admin.credentials.Certificate("data/credentials.json")
app=firebase_admin.initialize_app(cred)
firestoredb=firestore.client()
petitionbase=firestoredb.collection("petitions")
pendingbase=firestoredb.collection("pending")

def uploadPetition(title,text,author):
    uid=str(uuid.uuid1())
    data=dict(title=title,text=text,author=author,votes=0)
    pendingbase.document(uid).set(data)

def votePetition(uid):
    try:petition=petitionbase.document(uid)
    except:raise ValueError("No uid found with this name")
    votes=petition.get().get("votes")+1
    petition.update({"votes":votes})

def getRandomPetitions(count):
    petitions=list()
    for petition in list(petitionbase.list_documents()):
        petitions.append((petition.get().get("votes"),petition))
    random.shuffle(petitions)
    petitions.sort(key=lambda x:-x[0])
    petitions=[{**petition[1].get().to_dict(),"uid":petition[1].id} for petition in petitions]
    return petitions[:min(count,len(petitions)-1)]

def searchPetitions(searchstring):
    keywords=searchstring.split(" ")
    petitions=list()
    for petition in list(petitionbase.list_documents()):
        petitiondict=petition.get()
        score=0
        for keyword in keywords:
            if keyword.lower() in petitiondict.get("title").lower():score+=3
            if keyword.lower() in petitiondict.get("text").lower():score+=1
        if score>0:petitions.append((score,petition))
    petitions.sort(key=lambda x:-x[0])
    petitions=[{**petition[1].get().to_dict(),"uid":petition[1].id} for petition in petitions]
    return petitions

def publishPetition(uid):
    try:petition=pendingbase.document(uid).get().to_dict()
    except:raise ValueError("No uid found with this name")
    pendingbase.document(uid).delete()
    petitionbase.document(uid).set(petition)
