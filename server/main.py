import flask, json
import firebasemanager,sdmxmanager

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

@app.route("/getRandomPetitions", methods=["GET", "POST"])
def getRandomPetitions():
    """Download a number of petitions from online database"""
    try:
        args = flask.request.json
        count = args["count"]
        petitions=firebasemanager.getRandomPetitions(int(count))
        return json.dumps(petitions)
    except:
        return "false"

@app.route("/searchPetitions",methods=["GET","POST"])
def searchPetitions():
    """Search petitions relevent to you"""
    try:
        args = flask.request.json
        searchstring = args["searchstring"]
        targets=firebasemanager.searchPetitions(searchstring)
        return json.dumps(targets)
    except:
        return "false"

@app.route("/publishPetitions",methods=["GET","POST"])
def publishPetitions():
    """Move a petition to the published folder"""
    try:
        args = flask.request.json
        uid = args["uid"]
        firebasemanager.publishPetition(uid)
        return "true"
    except:
        return "false"

@app.route("/indicatorTypes", methods=["GET", "POST"])
def indicatorTypes():
    try:
        return json.dumps(list(sdmxmanager.indicators.keys()))
    except:
        return "false"

@app.route("/countries", methods=["GET", "POST"])
def countries():
    try:
        return json.dumps(sdmxmanager.countries)
    except:
        return "false"

@app.route("/getIndicatorByCountry", methods=["POST"])
def getIndicatorByCountry():
    try:
        args = flask.request.json
        indicator = sdmxmanager.indicators[args["indicator"]]
        country = args["country"]
        return json.dumps(sdmxmanager.files[indicator][country])
    except:
        return "false"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=235, threaded=True)
