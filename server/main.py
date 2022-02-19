import flask, json
import firebasemanager

app = flask.Flask(__name__)

@app.route("/uploadPetition", methods=["POST"])
def uploadPetition():
    """Upload new petition for official review.
        Include title, body and author(optional)"""
    try:
        args = flask.request.json
        title = args["title"]
        body = args["text"]
        author = args.get("author", "Anonyme")
        firebasemanager.uploadPetition(title,body,author)
        return "true"
    except:
        return "false"

@app.route("/votePetition", methods=["GET", "POST"])
def votePetition():
    """Vote to show your support for a petition"""
    try:
        args = flask.request.json
        uid = args["uid"]
        firebasemanager.votePetition(uid)
        return "true"
    except:
        return "false"

@app.route("/getPetition", methods=["GET", "POST"])
def getPetition():
    """Download a number of petitions from online database"""
    try:
        args = flask.request.json
        count = args["count"]
        petitions=firebasemanager.getPetitions(int(count))
        return json.dumps(petitions)
    except:
        return "false"

@app.route("/publishPetition",methods=["GET","POST"])
def publishPetition():
    """Move a petition to the published folder"""
    try:
        args = flask.request.json
        uid = args["uid"]
        firebasemanager.publishPetition(uid)
        return "true"
    except:return "false

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=235, threaded=True)
