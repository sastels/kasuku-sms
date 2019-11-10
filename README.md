# kasuku-sms

Kasuku sends and receives texts

## Workflow

### Kid finishes session

- `kasuku_kids` posts to `kasuku-sms` with json

```
{
    kidId: "myid"
}
```

- kasuku-sms looks up parent phone number and sends a query text

### Parent responds

- kasuku-sms receives a "yes" or "no" text (via a `/sms` post)
- app looks up number and finds corresponding `kidId`
- app reads the stats record for `kidId` and updates the tantrum field
