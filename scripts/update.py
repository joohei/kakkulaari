import time
start_time = time.time()
import datetime
import requests
import json
import base64
from PIL import Image
import os

repo_slug = "joohei/kakkulaari"
branch = "main"
user = "joohei"
token = "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"

def push_to_repo_branch(gitHubFileName, fileName, repo_slug, branch, user, token, folder, one_file):
    if one_file:
        print(f"{datetime.datetime.now()}: Pushing {fileName} to repository {repo_slug}")

    message = "Automated update " + str(datetime.datetime.now())
    path = "https://api.github.com/repos/%s/branches/%s" % (repo_slug, branch)

    r = requests.get(path, auth=(user,token))
    if not r.ok:
        print(f"{datetime.datetime.now()}: Error when retrieving branch info from %s" % path)
        print(f"{datetime.datetime.now()}: Reason: %s [%d]" % (r.text, r.status_code))
        raise
    rjson = r.json()
    subtreeurl = rjson['commit']['commit']['tree']['url']
    r2 = requests.get(subtreeurl, auth=(user,token))
    if not r2.ok:
        print(f"{datetime.datetime.now()}: Error when retrieving subtree from %s" % subtreeurl)
        print(f"{datetime.datetime.now()}: Reason: %s [%d]" % (r2.text, r2.status_code))
        raise
    r2json = r2.json()
    for file in r2json['tree']:
        if file['path'] == folder:
            treeurl = file['url']
    r3 = requests.get(treeurl, auth=(user,token))
    if not r3.ok:
        print(f"{datetime.datetime.now()}: Error when retrieving tree from %s" % treeurl)
        print(f"{datetime.datetime.now()}: Reason: %s [%d]" % (r3.text, r3.status_code))
        raise
    r3json = r3.json()

    sha = None

    for file in r3json['tree']:
        if file['path'] == gitHubFileName:
            sha = file['sha']

    if sha is None and one_file:
        print(f"{datetime.datetime.now()}: Could not find " + gitHubFileName + " in repos 'tree'")
        print(f"{datetime.datetime.now()}: Creating file and pushing")

    with open(fileName, "r+b") as data:
            content = base64.b64encode(data.read())

    inputdata = {}
    inputdata["path"] = gitHubFileName
    inputdata["branch"] = branch
    inputdata["message"] = message
    inputdata["content"] = content.decode("utf-8")
    if sha:
        inputdata["sha"] = str(sha)

    updateURL = "https://api.github.com/repos/joohei/kakkulaari/contents/" + folder + "/" + gitHubFileName
    try:
        rPut = requests.put(updateURL, auth=(user,token), data = json.dumps(inputdata))
        if not rPut.ok:
            print(f"{datetime.datetime.now()}: Error when pushing to %s" % updateURL)
            print(f"{datetime.datetime.now()}: Reason: %s [%d]" % (rPut.text, rPut.status_code))
            raise Exception
    except requests.exceptions.RequestException as e:
        print('Something went wrong! I will print all the information that is available so you can figure out what happend!')
        print(rPut)
        print(rPut.headers)
        print(rPut.text)
        print(e)

    if one_file:
        print(f"{datetime.datetime.now()}: Successfully pushed {fileName} to repository {repo_slug}")

url = "https://graph.instagram.com/me/media?fields=media_url,caption,timestamp&access_token=IGQVJWOVBXZAlBnQjZAZAOUI1dEVMQVU1SDRLa0hra2h4bS1XLXgwSktLRFlOdUNzVWY3YnJCQWZAnSHB3U3YwNjVDRlIxNXEwTDk3YnJnS1ZANNENHTktxeHhjRlFVR1JubEdlVDFVWnpJcnRjN0F3Q1V1MQZDZD"

json_file = {"data":[]}

data = requests.get(url).json()

def retrieve_and_update(data, json_file):
    for item in data["data"]:
        json_file["data"].append(item)

    if "next" in data["paging"].keys():
        url = data["paging"]["next"]
        data = requests.get(url).json()
        retrieve_and_update(data, json_file)

retrieve_and_update(data, json_file)
with open('API.json', 'w') as f:
    json.dump(json_file, f, indent=2)

push_to_repo_branch("API.json", "API.json", repo_slug, branch, user, token, "scripts", True)

def convert_images(json_file):
    pushed = 0
    print(f"{datetime.datetime.now()}: Creating and pushing jpg images")
    if not os.path.exists("photos"):
        os.mkdir("photos")
    for image in json_file["data"]:
        image_name = "?".join(image["media_url"].split("/")).split("?")[5]
        if not os.path.exists(f"photos/{image_name}"):
            response = requests.get(image["media_url"])
            with open(f"photos/{image_name}", "wb") as f:
                f.write(response.content)
            push_to_repo_branch(image_name, f"photos/{image_name}", repo_slug, branch, user, token, "images", False)
            pushed += 1
            print(f"{datetime.datetime.now()}: Successfully pushed {pushed} items to repository {repo_slug}", end="\r")

    if pushed == 0:
        print(f"{datetime.datetime.now()}: All images already exist")
    else:
        print(f"{datetime.datetime.now()}: Successfully created and pushed {pushed} image files")
    print()

convert_images(json_file)

def build_website():
    print(f"{datetime.datetime.now()}: Building website at Netlify")
    rPost = requests.post("https://api.netlify.com/build_hooks/621ce735d0478da364bbfac0")
    if not rPost.ok:
        print(f"{datetime.datetime.now()}: Error when building website at Netlify")
        print(f"{datetime.datetime.now()}: Reason: %s [%d]" % (rPost.text, rPost.status_code))
        raise Exception
    print(f"{datetime.datetime.now()}: Successfully built website")

build_website()

print(f"{datetime.datetime.now()}: Process complete in {round(time.time() - start_time, 2)}s")
