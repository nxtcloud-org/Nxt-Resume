import json
import boto3
from boto3.dynamodb.conditions import Key

table_name = "YourDynamoDBTableName"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(table_name)


def lambda_handler(event, context):
    print("##########")
    path = event["requestContext"]["http"]["path"]
    print(path)
    method = event["requestContext"]["http"]["method"]
    print(method)
    print("##########")
    if path == "/" and method == "GET":
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "람다 작동 확인!"}, ensure_ascii=False),
        }
    elif path == "/visit" and method == "GET":
        print("방문!")
        return handle_visit()
    elif path == "/likes" and method == "GET":
        print("좋아요 조회!")
        return handle_likes()
    elif path == "/like" and method == "POST":
        print("좋아요 추가!")
        return handle_like()
    else:
        return {
            "statusCode": 400,
            "body": json.dumps({"message": "Bad Request"}, ensure_ascii=False),
        }


def handle_visit():
    response = table.update_item(
        Key={"type": "visit_count"},
        UpdateExpression="ADD visits :inc",
        ExpressionAttributeValues={":inc": 1},
        ReturnValues="UPDATED_NEW",
    )
    visits = response["Attributes"]["visits"]  # int로 변환 작업 필요
    print(f"visits type is {type(visits)}")
    return {
        "statusCode": 200,
        "body": json.dumps({"visits": visits}, ensure_ascii=False),
    }


def handle_likes():
    response = table.get_item(Key={"type": "like_count"})
    likes = response.get("Item", {}).get("likes", 0)
    print(f"likes type is {type(likes)}")
    return {"statusCode": 200, "body": json.dumps({"likes": likes}, ensure_ascii=False)}


def handle_like():
    response = table.update_item(
        Key={"type": "like_count"},
        UpdateExpression="ADD likes :inc",
        ExpressionAttributeValues={":inc": 1},
        ReturnValues="UPDATED_NEW",
    )
    likes = response["Attributes"]["likes"]  # int로 변환 작업 필요
    return {"statusCode": 200, "body": json.dumps({"likes": likes}, ensure_ascii=False)}
