resource "ibm_container_cluster" "free_cluster" {
  name            = "test"
  datacenter      = "dal10"
  machine_type    = "free"
  hardware        = "shared"
  public_vlan_id  = "vlan"
  private_vlan_id = "vlan"
  subnet_id       = ["1154643"]

  default_pool_size = 1
}