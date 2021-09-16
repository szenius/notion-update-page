# Notion Update Page

![Test Action](https://github.com/szenius/notion-update-page/workflows/.github/workflows/action.yml/badge.svg)

GitHub action to update a Notion page property on commit created by merging a Pull Request.

## Example Usage

```yml
uses: szenius/notion-update-page@v1.0
with:
  gh-username: "username"
  gh-token: ${{ secrets.GH_ACCESS_TOKEN }}
  notion-key: ${{ secrets.NOTION_KEY }}
  notion-property-name: "Status"
  notion-update-value: "Merged"
```

- `gh-username`: GitHub username of user who has access to the repository
- `gh-token`: GitHub access token of user who has access to the repository
- `notion-key`: Notion Integration Secret Key
- `notion-property-name`: Notion Page property to be updated
- `notion-update-value`: New value for Notion page property

The [test workflow](.github/workflows/on_master.yml) is linked to [this Notion database](https://foregoing-cub-523.notion.site/4964f7c754f54c41abce56028d990ac6?v=9ece5b75d4914584b43685bcbc6f3d1c).
